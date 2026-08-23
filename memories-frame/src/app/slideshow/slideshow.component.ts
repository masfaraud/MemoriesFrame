import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Photo, PhotoView } from '../models/photos.model';
import { DatePipe } from '@angular/common';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';
import { MapComponent } from '../map/map.component';
import { ClockComponent } from '../clock/clock.component';
import { PhotoService } from '../services/photo.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-slideshow',
  standalone: true,
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.scss',
  imports: [DatePipe, MapComponent, ClockComponent, TimeAgoPipe, RouterLink]

})
export class SlideshowComponent implements OnInit {
  private photoService = inject(PhotoService);


  transitioning = false;
  @Output() photoChanged = new EventEmitter<Photo>();
  currentIndex = 0;
  currentPhoto: Photo;
  photoViews: PhotoView[]

  showNext() {

    this.currentIndex = (this.currentIndex + 1) % this.photoViews.length;
    this.currentPhoto = this.photoViews[this.currentIndex]

    this.currentIndex = (this.currentIndex + 1) % this.photoViews.length;
    this.currentPhoto = this.photoViews[this.currentIndex]
    this.transitioning = false;

    console.log(this.currentPhoto)


  }

  ngOnInit() {
    // this.currentPhoto = this.photos[0]

    this.photoService.getAllPhotoViews()
      .then(p => {

        this.photoViews = p;
        console.log("photos ecomp", p)

        if (p.length > 0) {
          this.currentPhoto = p[0];
          setInterval(() => {

            this.showNext()

          }, 5000);

        }


      });


  }

}