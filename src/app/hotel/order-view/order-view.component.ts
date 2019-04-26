import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HotelService } from './../hotel.service';
import { Hotel} from './../hotel.model';
import { Order } from './../order.model';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})

//display all hotels
export class OrderViewComponent implements OnInit {
   orders: Order[] = [];
   userId: any;


   constructor(private route: ActivatedRoute, private router: Router, public hotelService: HotelService, private http: HttpClient){
    this.route.queryParams.subscribe(params => {
      this.userId = params["userId"];
    });
   }
  ngOnInit() {
      this.http.get<{orders: Order[]}>('http://localhost:3000/vieworder/' + this.userId).subscribe((orderData) => {
          console.log(orderData);
          this.orders = orderData.orders;
      });
  }

  }
