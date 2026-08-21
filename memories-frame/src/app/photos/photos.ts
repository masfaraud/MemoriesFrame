import { Component } from '@angular/core';
import { Photo } from '../models/photos.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-photos',
  imports: [RouterLink],
  templateUrl: './photos.html',
  styleUrl: './photos.scss',
})
export class Photos {

  photos: Photo[] = [];

  selectedPhotos: File[];

  onPhotosSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files) {
      return;
    }

    this.selectedPhotos = Array.from(input.files);
    console.log(this.selectedPhotos)
}

}
