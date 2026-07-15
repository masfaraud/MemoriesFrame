import {Component} from '@angular/core';


@Component({
 selector:'app-clock',
 standalone:true,
 template:`
 <div class="clock">
   {{time}}
 </div>
 `,
 styles:[`
 .clock {
   font-size:50px;
   margin:40px;
 }
 `]
})
export class ClockComponent {

 time="";

 constructor(){

   setInterval(()=>{

     this.time =
       new Date()
       .toLocaleTimeString(
          [],
          {
            hour:"2-digit",
            minute:"2-digit"
          }
       );

   },1000);

 }

}