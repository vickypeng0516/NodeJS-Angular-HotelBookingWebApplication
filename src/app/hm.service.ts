import { Injectable } from '@angular/core';
import { HotelM } from './hm.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class HmService {
  private hotels: HotelM[] =[] ;
  private hotel : HotelM;
  private hotelM: HotelM[] =[] ;
  private hotelMUpdated = new Subject<HotelM[]>();
  private datahotel  :any;


  constructor(private http: HttpClient) { }
  
  getHotelM() : any {
    this.http.get<{hotels: HotelM[]}>('http://localhost:3000/hotels').subscribe((Data) => {
        //console.log(Data);
        this.hotels = Data.hotels;
        //console.log(this.hotels[0].email);
        this.hotel = this.hotels[0];
        console.log(this.hotel.email);
        
        this.hotelMUpdated.next([...this.hotels]);
      
    });
    // console.log("From  Hotel");
    // console.log(this.hotel)
    // return this.hotel;
  }
  getHotelMUpdatedListener() {
    return this.hotelMUpdated.asObservable();
  }

  addHotel(
    id: string,
    userAccount:String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    name: String,
    location: String,
    image: String,
    price: String,
  ){
    const hotel: HotelM = {
      _id: null,
      userAccount:userAccount,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      name: name,
      location: location,
      image: image,
      price: price
    };
    this.http.post('http://localhost:3000/hoteladd', hotel).subscribe((responseData) =>{
        this.hotelM.push(hotel);
        this.hotelMUpdated.next([...this.hotelM]);
    });
  }

  
}


