import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute,  NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  constructor(
    private router: Router,
    private http: HttpClient) 
            {
               
              
            }
            checkadmin(){
              let a = (document.getElementById("username") as HTMLInputElement).value;
              let b = (document.getElementById("password") as HTMLInputElement).value;
              
              if(a!="Admin"||b!="123456"){
                alert("Your role is not administrator");
                return;
              }else{
                window.location.href = "/adminmainpage";
              
              }
            }

  
  ngOnInit() {
  }

}
