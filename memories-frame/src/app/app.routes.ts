import { Routes } from '@angular/router';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { LoaderComponent } from './loader/loader.component';
import { Photos } from './photos/photos';


export const routes: Routes = [{
    path: '',
    component: SlideshowComponent
  },
  {
    path: 'photos',
    component: Photos
  },
  {
    path: 'photos/add',
    component: LoaderComponent
  }
];
