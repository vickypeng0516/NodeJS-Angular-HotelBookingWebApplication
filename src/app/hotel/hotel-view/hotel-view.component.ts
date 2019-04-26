import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HotelService } from './../hotel.service';
import { Hotel} from './../hotel.model';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-hotel-view',
  templateUrl: './hotel-view.component.html',
  styleUrls: ['./hotel-view.component.scss']
})

//display all hotels
export class HotelViewComponent implements OnInit {
  // title = 'Hotel View';
  hotels: Hotel[] = [];
  userId: any;
      // hotels = [
      //   {
      //     name: "Test Hotel Name",
      //     location: "Test Hotel Location",
      //     price: "Test Hotel Price"
      //   }
      // ];
  private hotelsSub: Subscription;
  private hotelSub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, public hotelService: HotelService, private http: HttpClient) {}
  ngOnInit() {
      this.hotelService.getHotels();
      this.hotelsSub = this.hotelService.getHotelsUpdatedListener().subscribe((hotels: Hotel[]) => {
        this.hotels = hotels;
      });
      this.route.queryParams.subscribe(params => {
        this.userId = params["userId"];
      });
  }

  onSearch(form: NgForm) {
    const searchName = form.value.searchName;
    console.log(searchName);
    this.http.get<{hotels: Hotel[]}>('http://localhost:3000/hotelsearch/' + searchName).subscribe((hotelData) => {
      console.log(hotelData);
      this.hotels = hotelData.hotels;
    });
  }

  hotelDetail(hotel) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
         "hotelId" : hotel._id,
         "userId" : this.userId,
        }
      };
      this.router.navigate(['/hoteldetail'], navigationExtras);
  }

  viewOrder() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        "userId" : this.userId
      }
    };
    this.router.navigate(['/vieworder'], navigationExtras);
  }
}
