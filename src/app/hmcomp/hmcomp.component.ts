import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HmService } from './../hm.service';
import {HotelM} from './../hm.model';
import { HttpClient } from '@angular/common/http';
import { HotelService } from '../hotel/hotel.service';
import { ActivatedRoute,  NavigationExtras,Router } from '@angular/router';

@Component({
  selector: 'app-hmcomp',
  templateUrl: './hmcomp.component.html',
  styleUrls: ['./hmcomp.component.scss']
})
export class HmcompComponent implements OnInit {

  hotels: HotelM[] = [];
  hotel : HotelM;
  managerID : any;
  firstName: String;
  lastName:String;
  email:String;
  image:String;
  private hotelMSub: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private http: HttpClient,
    public hmService: HmService) { 
      this.route.queryParams.subscribe(params => {
        this.managerID = params["managerID"];
       });
       console.log("constructor+"+this.managerID);
    }

  ngOnInit() {

    this.http.get<{hotels: HotelM[]}>('http://localhost:3000/hotels').subscribe((Data) => {
        this.hotels = Data.hotels;
        for(let h of this.hotels){
            if(h.userAccount===this.managerID){
              this.hotel = h;
              this.firstName=this.hotel.firstName;
              this.lastName = this.hotel.lastName;
              this.email=this.hotel.email;
              this.image = this.hotel.image;
              console.log("ngOnInIT");
              console.log(this.hotel);
            }
        }
    });
    this.hotelMSub = this.hmService.getHotelMUpdatedListener().subscribe((hotels: HotelM[]) => {
      this.hotels = hotels;
      });
  }

  //update hotel information like price or other
  updateProfile()
  {
    console.log("Inside Update")
    const Hotel = {
      userAccount:this.hotel.userAccount,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.hotel.phone,
      name: this.hotel.name,
      location: this.hotel.location,
      image: this.image,
      price: this.hotel.price,
    }
    this.http.put('http://localhost:3000/hotels/' + this.hotel.userAccount, Hotel)
      .subscribe((data) => {
        const options = {
          overlay: true,
          overlayClickToClose: true,
          showCloseButton: true,
          duration: 5000
        };
        if (data[0] === undefined) {
          console.log("Undefine");
        }
      })
      const navigationExtras: NavigationExtras = {
        queryParams: {
         "managerID" : this.hotel.userAccount,
        }
      };
      //console.log("hahah"+hotel.userAccount);
      this.router.navigate(['/hmmodifypasssucc'], navigationExtras);
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
