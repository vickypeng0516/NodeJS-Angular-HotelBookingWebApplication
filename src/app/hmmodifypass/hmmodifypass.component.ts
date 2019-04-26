import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute,  NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HmService } from './../hm.service';
import {HotelM} from './../hm.model';
import { HttpClient } from '@angular/common/http';
import {users} from './us.model';

@Component({
  selector: 'app-hmmodifypass',
  templateUrl: './hmmodifypass.component.html',
  styleUrls: ['./hmmodifypass.component.scss']
})
export class HmmodifypassComponent implements OnInit {

  hotels: HotelM[] = [];
  hotel : HotelM;
  managerID : any;
  user : users[] = [];//users Array from all 
  us : users;//the specific users searched from users Array
  origP: any;
  UserAccount:any;
  UserPassword: any;
  Role: any;
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
              console.log("ngOnInIT");
              console.log(this.hotel);
            }
        }
    });
    this.http.get<{user: users[]}>('http://localhost:3000/users').subscribe((uData) => {
        this.user = uData.user;
        for(let u of this.user){
            if(u.UserAccount===this.managerID){
              this.us = u;
              this.origP = this.us.UserPassword;
              console.log("ngggggg" + this.origP);
              console.log(this.us);
            }
        }
    });
    this.hotelMSub = this.hmService.getHotelMUpdatedListener().subscribe((hotels: HotelM[]) => {
      this.hotels = hotels;
      });
  }

  //check password validation
  checkp(){
    let temp =(document.getElementById("password") as HTMLInputElement).value;
    let temp1 =(document.getElementById("password1") as HTMLInputElement).value;
    let temp2 = (document.getElementById("password2") as HTMLInputElement).value;
    
    if(temp==="" || temp1==="" || temp2===""){
      alert("please input every area");
      return;
    }
    if(temp1!=temp2){
      alert("Two passwords should be the same.");
      return;
    }
    if(temp != this.origP)
    {
      alert("the Original password is wrong ");
      return;
    }
    this.updateProfile(temp1);
  }

  //update hotel manager password 
  updateProfile(temp1)
  {
    console.log("Inside Update" + temp1);
    const User = {
      UserAccount:this.hotel.userAccount,
      UserPassword: temp1,
      Role: this.us.Role,
    }
    console.log("User object" + User.UserPassword +"  "+ User.Role);
    this.http.put('http://localhost:3000/users/' + this.hotel.userAccount, User)
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
