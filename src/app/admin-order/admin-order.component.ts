import { Component, OnInit } from '@angular/core';
import {Order} from'./../hotel/order.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute,  NavigationExtras,Router } from '@angular/router';
@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})

export class AdminOrderComponent implements OnInit {
  orders:Order[]=[];
  o:Order;
  id: any;
  firstName: any;
  lastName: any;
  email: any;
  phone: any;
  date: any;
  hotelName: any;
  hotelId: any;
  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private http: HttpClient) { }

  ngOnInit() {
    this.http.get<{orders: Order[]}>('http://localhost:3000/orders').subscribe((Data) => {
    this.orders = Data.orders;
    console.log(this.orders);
});
  }
 
}
