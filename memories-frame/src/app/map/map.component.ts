import {
  Component,
  Input,
  AfterViewInit
} from '@angular/core';

import * as L from 'leaflet';
import { Photo } from '../models/photos.model';


@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl:'./map.component.html',
  styleUrl:'./map.component.scss'
})
export class MapComponent
  implements AfterViewInit {

  @Input() photo?: Photo;


  ngAfterViewInit() {
  console.log('ma2p', this.photo)
    if (this.photo !== undefined && this.photo.latitude && this.photo.longitude){
      console.log('map')
      const map = L.map('map')
        .setView(
          [
            this.photo.latitude,
            this.photo.longitude
          ],
          12
        );


      L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
      )
        .addTo(map);


      L.marker(
        [
          this.photo.latitude,
          this.photo.longitude
        ])
        .addTo(map);


    }

  }

}