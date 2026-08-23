import { Routes } from '@angular/router';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { Photos } from './photos/photos';


export const routes: Routes = [{
    path: '',
    component: SlideshowComponent
  },
  {
    path: 'photos',
    component: Photos
  }
];
