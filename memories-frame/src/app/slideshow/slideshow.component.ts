import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Photo } from '../models/photos.model';

@Component({
 selector:'app-slideshow',
 standalone:true,
 templateUrl:'./slideshow.component.html',
 styleUrl:'./slideshow.component.scss'
})
export class SlideshowComponent implements OnInit {

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
      id: "1",
      path: "photo2.jpg",
      filename: "photo2.jpg",
      takenAt: new Date("2020-07-15"),
      latitude: 45.899,
      longitude: 6.129,
      location: "USA"
    }
  ];


  showNext() {

    this.currentIndex = (this.currentIndex+1)%this.photos.length;
    this.currentPhoto = this.photos[this.currentIndex]

    this.photoChanged.emit(
      this.currentPhoto
    );
  }

 ngOnInit(){
  this.currentPhoto = this.photos[0]


   setInterval(()=>{

      this.showNext()

   },5000);

 }

}