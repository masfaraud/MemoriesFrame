import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Photo } from '../models/photos.model';
import { DatePipe } from '@angular/common';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';
import { MapComponent } from '../map/map.component';
import { ClockComponent } from '../clock/clock.component';

@Component({
 selector:'app-slideshow',
 standalone:true,
 templateUrl:'./slideshow.component.html',
 styleUrl:'./slideshow.component.scss',
 imports: [DatePipe, MapComponent, ClockComponent, TimeAgoPipe]

})
export class SlideshowComponent implements OnInit {
  
  transitioning = false;
  @Output() photoChanged = new EventEmitter<Photo>();
  currentIndex = 0;
  currentPhoto: Photo;
  photos: Photo[] = [
    {
      id: "1",
      path: "photo1.jpg",
      filename: "photo1.jpg",
      takenAt: new Date("2020-07-15"),
      latitude: 45.899,
      longitude: 6.129,
      location: "Annecy"
    },
    {
      id: "2",
      path: "photo2.jpg",
      filename: "photo2.jpg",
      takenAt: new Date("2023-02-11"),
      latitude: 48.5496,
      longitude: 2.1918,
      location: "La ferté alais"
    }
  ];


  showNext() {

    this.transitioning = true;
    setTimeout(() => {

      this.currentIndex = (this.currentIndex+1)%this.photos.length;
      this.currentPhoto = this.photos[this.currentIndex]
      this.transitioning = false;

    }, 1000);

    
  }

 ngOnInit(){
  this.currentPhoto = this.photos[0]

   setInterval(()=>{

      this.showNext()

   },5000);

 }

}