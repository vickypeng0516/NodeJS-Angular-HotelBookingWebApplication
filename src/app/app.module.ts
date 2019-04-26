import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainpageComponent } from './mainpage/mainpage.component';
import { LoginComponent } from './login/login.component';

import { HMmainComponent } from './hmmain/hmmain.component';
import { HmmodifypassComponent } from './hmmodifypass/hmmodifypass.component';
import { HmmodifypasssuccComponent } from './hmmodifypasssucc/hmmodifypasssucc.component';
import { HmmanageComponent } from './hmmanage/hmmanage.component';

import { AdminComponent } from './admin/admin.component';

// View All Hotels
import { HotelViewComponent } from './hotel/hotel-view/hotel-view.component';
// View Details of Hotel
import { HotelDetailComponent } from './hotel/hotel-detail/hotel-detail.component';
// Book A Hotel
import { HotelBookComponent } from './hotel/hotel-book/hotel-book.component';
// Add A Hotel
import { HotelAddComponent } from './hotel/hotel-add/hotel-add.component';
import { AdminmainpageComponent } from './adminmainpage/adminmainpage.component';
import { HmcompComponent } from './hmcomp/hmcomp.component';
import { HmorderComponent } from './hmorder/hmorder.component';
import { AdminHotelComponent } from './admin-hotel/admin-hotel.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { OrderViewComponent} from './hotel/order-view/order-view.component';


@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    LoginComponent,
    HMmainComponent,
    HmmodifypassComponent,
    HmmodifypasssuccComponent,
    HmmanageComponent,
    AdminComponent,
    HotelViewComponent,
    HotelDetailComponent,
    HotelBookComponent,
    HotelAddComponent,


    AdminmainpageComponent,

    HmcompComponent,

    AdminmainpageComponent,

    HmorderComponent,

    AdminHotelComponent,

    AdminOrderComponent,

    OrderViewComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
