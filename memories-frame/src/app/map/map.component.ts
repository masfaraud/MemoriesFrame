import {
  Component,
  Input,
  AfterViewInit,
  OnChanges
} from '@angular/core';

import * as L from 'leaflet';
import { PhotoView } from '../models/photos.model';


@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent
  implements OnChanges, AfterViewInit {

  @Input() photo?: PhotoView;

  private map?: L.Map;
  private marker?: L.Marker;

  ngAfterViewInit(): void {
    this.map = L.map('map', {
      zoomControl: false
    }).setView([0, 0], 4);

    L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
    ).addTo(this.map);

    this.marker = L.marker([0, 0]).addTo(this.map);

    // If a photo was already received before the view existed
    this.updateMap();
  }

  ngOnChanges() {
    this.updateMap()
  }

  updateMap() {
    if (!this.map || !this.marker || !this.photo) {
      return;
    }

    if (this.photo.latitude == null || this.photo.longitude == null) {
      return;
    }

    const pos: L.LatLngExpression = [
      this.photo.latitude,
      this.photo.longitude
    ];

    this.marker.setLatLng(pos);
    this.map.setView(pos, 10);

  }

}