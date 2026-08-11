import { Routes } from '@angular/router';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { LoaderComponent } from './loader/loader.component';
export const routes: Routes = [{
    path: '',
    component: SlideshowComponent
  },
  {
    path: 'photos/add',
    component: LoaderComponent
  }
];
