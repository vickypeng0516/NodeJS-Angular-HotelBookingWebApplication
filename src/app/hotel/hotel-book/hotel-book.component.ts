import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { HotelService } from './../hotel.service';
import { ActivatedRoute,  NavigationExtras, Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-hotel-book',
  templateUrl: './hotel-book.component.html',
  styleUrls: ['./hotel-book.component.scss']
})

// display single hotel detail
export class HotelBookComponent {
  hotelId: any;
  hotelName: any;
  firstName = "";
  lastName = "";
  email = "";
  phone = "";
  date = "";
  userId: any;

  constructor(private route: ActivatedRoute, private router: Router, public hotelService: HotelService, private http: HttpClient) {
      this.route.queryParams.subscribe(params => {
       this.hotelId = params["hotelId"];
       this.hotelName = params["hotelName"];
       this.userId = params["userId"];
      });
  }

  onAddOrder(form: NgForm) {
    this.hotelService.addOrder(form.value.firstName, form.value.lastName, form.value.email, form.value.phone, form.value.date,
      this.hotelId, this.hotelName, this.userId);
    alert('Booking Successed');
  }

}
