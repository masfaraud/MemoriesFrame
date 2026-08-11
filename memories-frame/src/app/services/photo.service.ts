import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Photo } from '../models/photos.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private readonly photosSubject =
    new BehaviorSubject<Photo[]>([]);

  readonly photos$ =
    this.photosSubject.asObservable();

  async load(files: FileList) {

    const photos: Photo[] = [];

    for (const file of Array.from(files)) {

      if (!file.type.startsWith("image/"))
        continue;

      photos.push({
        id: crypto.randomUUID(),
        filename: file.name,
        file,
        url: URL.createObjectURL(file)
      });

    }
    console.log('photoservice', photos)

    this.photosSubject.next(photos);

  }

}