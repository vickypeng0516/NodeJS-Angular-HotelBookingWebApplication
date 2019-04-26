import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HmService } from './../hm.service';
import {HotelM} from './../hm.model';
import { HttpClient } from '@angular/common/http';
import { HotelService } from '../hotel/hotel.service';
import { ActivatedRoute,  NavigationExtras,Router } from '@angular/router';

@Component({
  selector: 'app-hmmain',
  templateUrl: './hmmain.component.html',
  styleUrls: ['./hmmain.component.scss']
})
export class HMmainComponent implements OnInit {
  hotels: HotelM[] = [];
  hotel : HotelM;
  //managerID = "test234@qq.com";
  managerID : any;

  private hotelMSub: Subscription;

  constructor(
    public hmService: HmService,
    private http: HttpClient,
    private route: ActivatedRoute, 
    private router: Router,
    ) { 
      this.route.queryParams.subscribe(params => {
        this.managerID = params["managerID"];
       });
    }
    

  ngOnInit() {
    this.http.get<{hotels: HotelM[]}>('http://localhost:3000/hotels').subscribe((Data) => {
        //console.log(Data);
        this.hotels = Data.hotels;
        //console.log(this.hotels[0].email);
        for(let h of this.hotels){
            if(h.userAccount===this.managerID){
              this.hotel = h;
              console.log(this.hotel);
            }
        }
        //this.hotel = this.hotels[0];
        console.log("happy"+this.hotel.email);
    });
    // this.hotel  = this.hmService.getHotelM();
    // console.log("From Return");
    // console.log(this.hotel)
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
       "hotelID" : hotel._id,
      }
    };
    this.router.navigate(['/hmorder'], navigationExtras);
  }

  ngOnDestroy() {
    this.hotelMSub.unsubscribe();
  }
}
