import { Injectable } from '@angular/core';
import exifr from 'exifr';


import { Photo, PhotoView } from '../models/photos.model';

function dmsToDecimal(dms?: number[]): number | undefined {
  if (!dms || dms.length < 3) {
    return undefined;
  }

  return dms[0] + dms[1] / 60 + dms[2] / 3600;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private db?: IDBDatabase;

  private readonly dbPromise = this.initDatabase();

  private async initDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('memories-frame', 1);

      request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains('photos')) {
          db.createObjectStore('photos', {
            keyPath: 'id'
          });
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  private async getPhotoId(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();

    const hash = await crypto.subtle.digest('SHA-256', buffer);

    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  async addPhoto(file: File): Promise<string> {
    const db = await this.dbPromise;

    const id = await this.getPhotoId(file);

    const metadata = await exifr.parse(file, {
    pick: [
      'DateTimeOriginal',
      'CreateDate',
      'GPSLatitude',
      'GPSLongitude'
    ]});

    console.log(metadata)


    return new Promise((resolve, reject) => {
      const transaction = db.transaction('photos', 'readwrite');
      const store = transaction.objectStore('photos');

      const request = store.add({
        id,
        file,
        filename: file.name,
        createdAt: Date.now(),
        takenAt: metadata?.DateTimeOriginal ? new Date(metadata.DateTimeOriginal)
      : metadata?.CreateDate
        ? new Date(metadata.CreateDate)
        : undefined,
        latitude: dmsToDecimal(metadata?.GPSLatitude),
        longitude: dmsToDecimal(metadata?.GPSLongitude)

      });

      request.onsuccess = () => resolve(id);
      request.onerror = () => {
        if (request.error?.name === 'ConstraintError') {
          // Already exists → not an error for us
          resolve("");
          return;
        }

        reject(request.error);
      };
      });
  }

  async getPhoto(id: string): Promise<Blob | undefined> {
    const db = await this.dbPromise;

    return new Promise((resolve, reject) => {
      const transaction = db.transaction('photos', 'readonly');
      const store = transaction.objectStore('photos');

      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result?.file);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  async getAllPhotos(): Promise<Photo[]> {
    const db = await this.dbPromise;

    return new Promise((resolve, reject) => {
      const transaction = db.transaction('photos', 'readonly');
      const store = transaction.objectStore('photos');

      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }


    async getAllPhotoViews(): Promise<PhotoView[]> {
      const photos = await this.getAllPhotos();

       return photos.map(photo => ({
       ...photo,
       url: URL.createObjectURL(photo.file)
  }));
  }


  async deleteAllPhotos(): Promise<void> {
  const db = await this.dbPromise;

  return new Promise((resolve, reject) => {
    const transaction = db.transaction('photos', 'readwrite');
    const store = transaction.objectStore('photos');

    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

}
