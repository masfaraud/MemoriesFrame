import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { ClockComponent } from './clock/clock.component';
import { MapComponent } from './map/map.component';
import { Photo } from './models/photos.model';

@Component({
  selector: 'app-root',
  imports: [SlideshowComponent, ClockComponent, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'memories-frame';

  currentPhoto?: Photo;


  onPhotoChanged(photo: Photo) {
    console.log(photo)
    this.currentPhoto = photo;
  }
}
