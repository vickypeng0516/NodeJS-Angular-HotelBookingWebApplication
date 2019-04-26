import { HttpClient } from '@angular/common/http';
import { HotelService } from './../hotel.service';
import { Subscription } from 'rxjs';
import { Hotel } from './../hotel.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})

// display single hotel detail
export class HotelDetailComponent implements OnInit {
    hotel: Hotel;
    hotelId: any;
    userId: any;


    private hotelSub: Subscription;
    constructor(private route: ActivatedRoute, private router: Router, public hotelService: HotelService, private http: HttpClient) {
       this.route.queryParams.subscribe(params => {
        this.hotelId = params["hotelId"];
        this.userId = params["userId"];
       });
    }
    id = +this.route.snapshot.paramMap.get('id');
    ngOnInit() {
      this.http.get<{hotels: Hotel}>('http://localhost:3000/hoteldetail/' + this.hotelId).subscribe((hotelData) => {
        console.log(hotelData.hotels);
        this.hotel = hotelData.hotels;
        // console.log(this.hotel.name);

      });
    }

    bookHotel(hotel) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
         "hotelId" : hotel._id,
         "hotelName" : hotel.name,
         "userId" : this.userId
        }
      };
      this.router.navigate(['/hotelbook'], navigationExtras);
  }

}
