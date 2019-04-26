import {Order} from './../hotel/order.model';
import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute,  NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HmService } from './../hm.service';
import {HotelM} from './../hm.model';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-hmorder',
  templateUrl: './hmorder.component.html',
  styleUrls: ['./hmorder.component.scss']
})
export class HmorderComponent implements OnInit {

  orders: Order[] = [];//all the orders from database
  order :Order[] = [];//the specific order selected by this hotel i
  hotels: HotelM[] = [];
  hotel : HotelM;
  managerID : any;
  hotelId: any;
  private hotelMSub: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private http: HttpClient,
    public hmService: HmService) { 
      this.route.queryParams.subscribe(params => {
        this.managerID = params["managerID"];
        this.hotelId = params["hotelID"];
       });
       console.log("constructor+"+this.managerID);
    }

    ngOnInit() {
      this.http.get<{hotels: HotelM[]}>('http://localhost:3000/hotels').subscribe((Data) => {
          this.hotels = Data.hotels;
          for(let h of this.hotels){
              if(h.userAccount===this.managerID){
                this.hotel = h;
                console.log("ngOnInIT");
              }
          }
      });
      // select the particular order by hotel id
      this.http.get<{orders: Order[]}>('http://localhost:3000/orders').subscribe((oData) => {
          this.orders = oData.orders;
          console.log("ng444");
          console.log(this.orders);
          for(let or of this.orders){
              if(or.hotelId===this.hotelId){ 
                this.order.push(or) ;
                console.log("ng");
                console.log(this.order);
              }
          }
      });

      this.hotelMSub = this.hmService.getHotelMUpdatedListener().subscribe((hotels: HotelM[]) => {
        this.hotels = hotels;
        });
    }

  //direct to the hotel manage page
  hotelman(hotel) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
       "managerID" : hotel.userAccount,
      }
    };
    this.router.navigate(['/hmmanage'], navigationExtras);
  }
  //direct to the modify password page
  modifyP(hotel) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
       "managerID" : hotel.userAccount,
      }
    };
    this.router.navigate(['/hmmodifypass'], navigationExtras);
  }

  //direct to the complete information page
  comp(hotel) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
       "managerID" : hotel.userAccount,
      }
    };
    this.router.navigate(['/hmcomp'], navigationExtras);
  }

  //direct to the hotel manager main page
  main(hotel) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
       "managerID" : hotel.userAccount,
      }
    };
    this.router.navigate(['/hmmain'], navigationExtras);
  }

  //direct to the hotel order 
  hmorder(hotel) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
       "managerID" : hotel.userAccount,
      }
    };
    this.router.navigate(['/hmorder'], navigationExtras);
  }

  ngOnDestroy() {
    this.hotelMSub.unsubscribe();
  }

}
