import { Component, EventEmitter, Output } from '@angular/core';
import { HotelService } from './../hotel.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-hotel-add',
  templateUrl: './hotel-add.component.html',
  styleUrls: ['./hotel-add.component.scss']
})

// display single hotel detail
export class HotelAddComponent {
   firstName= "";
   lastName= "";
   email= "";
   phone= "";
   name = "";
   location = "";
   image = "";
   price = "";

   constructor(public hotelService: HotelService){}
   onAddHotel(form: NgForm){
      this.hotelService.addHotel("","test234@qq.com",form.value.firstName, form.value.lastName, form.value.email,form.value.phone,  form.value.name, form.value.location, form.value.image, form.value.price);
   }
}
