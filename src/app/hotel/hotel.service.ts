import { HttpClient } from '@angular/common/http';
import { Hotel } from './hotel.model';
import { HotelM } from './../hm.model';
import { Order } from './order.model';
import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({providedIn: 'root'})
export class HotelService {
  private hotel: Hotel;
  private hotels: Hotel[] = [];
  private orders: Order[] = [];
  private hotelsUpdated = new Subject<Hotel[]>();
  private orderUpdated = new Subject<Order[]>();

  private hotelM: HotelM[] =[] ;
  private hotelMUpdated = new Subject<HotelM[]>();

  private hotelUpdated = new Subject<Hotel>();


  constructor(private http: HttpClient) {

  }
  getHotels() {
    this.http.get<{hotels: Hotel[]}>('http://localhost:3000/hotels').subscribe((hotelData) => {
      console.log(hotelData);
      this.hotels = hotelData.hotels;
      this.hotelsUpdated.next([...this.hotels]);
    });
  }

  getHotelsUpdatedListener() {
    return this.hotelsUpdated.asObservable();
  }

  getOrdersUpdatedListener(){
    return this.orderUpdated.asObservable();
  }


  // addHotel(name: string, location: string, image: string, price: string){
  //   const hotel: Hotel = {
  //     id: null,
  //     name: name,
  //     location: location,
  //     image: image,
  //     price: price
  //   };
  //   this.http.post('http://localhost:3000/hoteladd', hotel).subscribe((responseData) =>{
  //       this.hotels.push(hotel);
  //       this.hotelsUpdated.next([...this.hotels]);
  //   });
  // }
  // addHotel(
  //   id: string,
  //   userAccount:String,
  //   firstName: String,
  //   lastName: String,
  //   email: String,
  //   phone: String,
  //   name: String,
  //   location: String,
  //   image: String,
  //   price: String,
  // ){
  //   const hotel: HotelM = {

  getHotelUpdatedListener(){
    return this.hotelUpdated.asObservable();
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

  addOrder(firstName: string, lastName: string, email: string, phone: string, date: string, hotelId: string, hotelName: string, userId: string) {
    const order: Order = {
        id: null,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        date: date,
        hotelId:hotelId,
        hotelName : hotelName,
        userId: userId
    };
    this.http.post('http://localhost:3000/hotelbook', order).subscribe((responseData)=>{
        this.orders.push(order);
        this.orderUpdated.next([...this.orders]);
    });
  }
}
