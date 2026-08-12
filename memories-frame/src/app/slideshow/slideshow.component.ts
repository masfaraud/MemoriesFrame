import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Photo } from '../models/photos.model';
import { DatePipe } from '@angular/common';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';
import { MapComponent } from '../map/map.component';
import { ClockComponent } from '../clock/clock.component';
import { PhotoService } from '../services/photo.service';

@Component({
 selector:'app-slideshow',
 standalone:true,
 templateUrl:'./slideshow.component.html',
 styleUrl:'./slideshow.component.scss',
 imports: [DatePipe, MapComponent, ClockComponent, TimeAgoPipe]

})
export class SlideshowComponent implements OnInit {
  private photoService = inject(PhotoService);

  
  transitioning = false;
  @Output() photoChanged = new EventEmitter<Photo>();
  currentIndex = 0;
  currentPhoto: Photo;
  photos: Photo[]

  showNext() {

    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    this.currentPhoto = this.photos[this.currentIndex]

      this.currentIndex = (this.currentIndex+1)%this.photos.length;
      this.currentPhoto = this.photos[this.currentIndex]
      this.transitioning = false;

    
  }

  ngOnInit() {
    // this.currentPhoto = this.photos[0]

    this.photoService.photos$
      .subscribe(p => {

        this.photos = p;
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