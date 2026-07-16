import { DatePipe } from '@angular/common';
import {Component} from '@angular/core';


@Component({
 selector:'app-clock',
 standalone:true,
 templateUrl: './clock.component.html',
 styleUrl: './clock.component.scss',
 imports: [DatePipe]
})
export class ClockComponent {

 time: Date;

 constructor(){

   setInterval(()=>{

     this.time = new Date();

   },1000);

 }

}