import { Component, inject } from '@angular/core';
import { Photo, PhotoView } from '../models/photos.model';
import { RouterLink } from '@angular/router';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-photos',
  imports: [RouterLink],
  templateUrl: './photos.html',
  styleUrl: './photos.scss',
})
export class Photos {

  photoViews: PhotoView[] = [];

  photoService = inject(PhotoService)

  selectedPhotos: File[];

  ngOnInit(){
    this.refreshPhotos()
  }

  refreshPhotos(){
    this.photoService.getAllPhotoViews().then(photoViews => this.photoViews = photoViews);
  }

  async onPhotosSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;

    if (!input.files) {
      return;
    }

    this.selectedPhotos = Array.from(input.files);

    for (let photo of this.selectedPhotos){
      await this.photoService.addPhoto(photo);
      this.refreshPhotos()
    }


  }

  deleteAllPhotos(){
    const confirmed = window.confirm(
      `Are you sure you want to delete all ${this.photoViews.length} photos?`
    );

    if (!confirmed) {
      return;
    }

    this.photoService.deleteAllPhotos().then(() => this.refreshPhotos());
  }

}
