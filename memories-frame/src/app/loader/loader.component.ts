import { Component, inject } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  private photos = inject(PhotoService);

    load(event: Event) {

        const input =
            event.target as HTMLInputElement;

        if (!input.files)
            return;

        this.photos.load(input.files);
        console.log(this.photos)

    }
}
