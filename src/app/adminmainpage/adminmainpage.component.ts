
import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {user} from './../user.model';
import { ActivatedRoute,  NavigationExtras,Router } from '@angular/router';
@Component({
  selector: 'app-adminmainpage',
  templateUrl: './adminmainpage.component.html',
  styleUrls: ['./adminmainpage.component.scss']
})
export class AdminmainpageComponent implements OnInit {
  
  user : user[] = [];
  u : user;
  UserAccount:any;
  UserPassword: any;
  Role: any;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private http: HttpClient) { 
      
  }

  ngOnInit() {
    this.http.get<{user: user[]}>('http://localhost:3000/users').subscribe((Data) => {
        this.user = Data.user;
        console.log(this.user);
    });
  }

  delete(u){
    console.log(u._id);
    this.http.delete('http://localhost:3000/users/'+ u._id).subscribe((oooData) => {
        console.log("chenggong");
        window.location.reload();
    });
  }
}
