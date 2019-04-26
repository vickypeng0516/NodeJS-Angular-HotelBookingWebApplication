import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HotelM} from './../hm.model';
import { ActivatedRoute,  NavigationExtras,Router } from '@angular/router';
@Component({
  selector: 'app-admin-hotel',
  templateUrl: './admin-hotel.component.html',
  styleUrls: ['./admin-hotel.component.scss']
})
export class AdminHotelComponent implements OnInit {

    hotels:HotelM[]=[];
    h:HotelM;
    id:any;
    userAccount:any;
    firstName: any;
    lastName: any;
    email: any;
    phone: any;
    name: any;
    location: any;
    image: any;
    price: any;
  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private http: HttpClient) { 
    
  }

  ngOnInit() { this.http.get<{hotels: HotelM[]}>('http://localhost:3000/hotels').subscribe((Data) => {
    this.hotels = Data.hotels;
    console.log(this.hotels);
});
  }
  delete(h){
    console.log(h._id);
    this.http.delete('http://localhost:3000/users/'+ h._id).subscribe((oooData) => {
        console.log("chenggong");
        window.location.reload();
    });
  }
}
