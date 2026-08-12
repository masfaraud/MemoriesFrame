import { Component } from '@angular/core';
import { Photo } from '../models/photos.model';

@Component({
  selector: 'app-photos',
  imports: [],
  templateUrl: './photos.html',
  styleUrl: './photos.scss',
})
export class Photos {

  photos: Photo[];

}
