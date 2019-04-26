import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute,  NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HmService } from './../hm.service';
import {HotelM} from './../hm.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hmmanage',
  templateUrl: './hmmanage.component.html',
  styleUrls: ['./hmmanage.component.scss']
})
export class HmmanageComponent implements OnInit {

  hotels: HotelM[] = [];
  hotel : HotelM;
  managerID : any;
  name: String;
  location:String;
  phone:String;
  price:String;
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
              this.name=this.hotel.name;
              this.location = this.hotel.location;
              this.phone=this.hotel.phone;
              this.price = this.hotel.price;
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
      firstName: this.hotel.firstName,
      lastName: this.hotel.lastName,
      email: this.hotel.email,
      phone: this.phone,
      name: this.name,
      location: this.location,
      image: this.hotel.image,
      price: this.price,
    }
    console.log(Hotel.price+"ddddd"+Hotel.userAccount);
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
