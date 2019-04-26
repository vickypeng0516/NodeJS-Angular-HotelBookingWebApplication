import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainpageComponent} from './mainpage/mainpage.component';
import {LoginComponent} from './login/login.component';
import {AdminmainpageComponent} from './adminmainpage/adminmainpage.component'
import { HotelViewComponent } from './hotel/hotel-view/hotel-view.component';
import { HotelDetailComponent} from './hotel/hotel-detail/hotel-detail.component';
import { HotelBookComponent } from './hotel/hotel-book/hotel-book.component';
import { HotelAddComponent } from './hotel/hotel-add/hotel-add.component';
import {HMmainComponent} from './hmmain/hmmain.component';
import {HmmodifypassComponent} from './hmmodifypass/hmmodifypass.component';
import {HmmodifypasssuccComponent} from './hmmodifypasssucc/hmmodifypasssucc.component';
import {HmmanageComponent} from './hmmanage/hmmanage.component';
import { AdminComponent } from './admin/admin.component';
import {HmcompComponent} from './hmcomp/hmcomp.component';
import {HmorderComponent} from './hmorder/hmorder.component';
import { AdminHotelComponent } from './admin-hotel/admin-hotel.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { OrderViewComponent } from './hotel/order-view/order-view.component';


const routes: Routes = [
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' },
  {path: 'mainpage', component:MainpageComponent},
  {path: 'login', component:LoginComponent},
  {path: 'adminmainpage', component:AdminmainpageComponent},
  {path: 'hmmain', component:HMmainComponent},
  {path: 'hmmodifypass', component:HmmodifypassComponent},
  {path: 'hmmodifypasssucc', component:HmmodifypasssuccComponent},
  {path: 'hmmanage', component:HmmanageComponent},
  {path: 'admin', component:AdminComponent},
  {path: 'adminhotel',component:AdminHotelComponent},
  { path: 'hoteldetail', component: HotelDetailComponent },
  { path: 'hotels', component: HotelViewComponent },
  { path: 'hotelbook', component: HotelBookComponent },
  { path: 'hoteladd', component: HotelAddComponent },
  { path: 'hmcomp', component: HmcompComponent },
  { path: 'hmorder', component: HmorderComponent },
  { path: 'adminorder', component:AdminOrderComponent},
  { path: 'vieworder', component: OrderViewComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
