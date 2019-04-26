import { Component, OnInit } from '@angular/core';
import { BlockingProxy } from 'blocking-proxy';
import { UserService } from '../user.service';
import { ConstantPool } from '@angular/compiler';
import { user } from '../user.model';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { getDefaultService } from 'selenium-webdriver/opera';
import { userInfo } from 'os';
import { ActivatedRoute,  NavigationExtras, Router } from '@angular/router';
import {HmService} from './../hm.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: user[] = [];
  // private usersSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    public hmService: HmService,
    private http: HttpClient) { }

  tutorialmessage(){
    alert("Your user account should be in email form and your password should contain numbers and alphabets.");
  }
  //When leave this page, set all elements to default value
  setdefault(){
    (document.getElementById("hint4") as HTMLInputElement).style.display="none";
    (document.getElementById("option-traveller") as HTMLInputElement).checked=false;
    (document.getElementById("option-manager") as HTMLInputElement).checked=false;
    (document.getElementById("user-password") as HTMLInputElement).value=null;
    (document.getElementById("user-account") as HTMLInputElement).value=null;
    (document.getElementById("confirm-password") as HTMLInputElement).value=null;
    (document.getElementById("user-password") as HTMLInputElement).style.borderColor="black";
    (document.getElementById("user-account") as HTMLInputElement).style.borderColor="black";
    (document.getElementById("confirm-password") as HTMLInputElement).style.borderColor="black";
  }

  check(){
    this.ngOnInit();
    this.user = this.user;
    //Getting value from HTML element
    let temp0 = (document.getElementById("user-account") as HTMLInputElement).value;
    let temp1 = (document.getElementById("user-password") as HTMLInputElement).value;
    let temp2 = (document.getElementById("confirm-password") as HTMLInputElement).value;
    let temp3 = document.getElementById("option-traveller") as HTMLInputElement;
    let temp4 = document.getElementById("option-manager") as HTMLInputElement;
    let temp8 = document.getElementById("hint4") as HTMLInputElement;
    var re1 = new RegExp("^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$");//Regex for user account
    var re2 = new RegExp("^[a-zA-Z0-9-]+$");
    //Check if there are empty fields
    if(temp0==""||temp1==""||temp2==""){
      (document.getElementById("user-account") as HTMLInputElement).style.borderColor="red";
      (document.getElementById("user-password") as HTMLInputElement).style.borderColor="red";
      (document.getElementById("confirm-password") as HTMLInputElement).style.borderColor="red";
      temp8.style.display="inline-block";
      temp3.checked=false;
      temp4.checked=false;
      alert("Please enter all fields.");
      return;
    }
    //Check have user chosen any role
    if(temp3.checked==false&&temp4.checked==false){
      (document.getElementById("user-account") as HTMLInputElement).style.borderColor="black";
      (document.getElementById("user-password") as HTMLInputElement).style.borderColor="black";
      (document.getElementById("confirm-password") as HTMLInputElement).style.borderColor="black";
      temp8.style.display="inline-block";
      alert("Please choose a role.");
      return;
    }
    //Check if two passwords are the same
    if(temp1!=temp2){
      (document.getElementById("user-password") as HTMLInputElement).style.borderColor="red";
      (document.getElementById("confirm-password") as HTMLInputElement).style.borderColor="red";
      temp8.style.display="none";
      (document.getElementById("user-account") as HTMLInputElement).style.borderColor="black";
      (document.getElementById("user-password") as HTMLInputElement).value = null;
      (document.getElementById("confirm-password") as HTMLInputElement).value = null;
      alert("Two passwords should be the same.");
      return;
    }
    //Check user account regex
    if(!temp0.match(re1)){
        alert("Your user account should be in email form.");
        (document.getElementById("user-account") as HTMLInputElement).style.borderColor="red";
        (document.getElementById("user-password") as HTMLInputElement).style.borderColor="black";
        (document.getElementById("confirm-password") as HTMLInputElement).style.borderColor="black";
        temp8.style.display="none";
        return;
    }
    //Check password regex
    if(!temp1.match(re2)){
        alert("Your password should contain numbers and alphabets.");
        (document.getElementById("user-account") as HTMLInputElement).style.borderColor="black";
        (document.getElementById("user-password") as HTMLInputElement).style.borderColor="red";
        (document.getElementById("confirm-password") as HTMLInputElement).style.borderColor="black";
        temp8.style.display="none";
        return;
    }
    //If all field are success, check if the account already exist
    else{
      //this.ngOnInit();
      for(var indexc=0;indexc<this.user.length;indexc++){
      if(temp0==this.user[indexc].UserAccount){
        alert("This account has already been registered.");
        (document.getElementById("user-password") as HTMLInputElement).value=null;
        (document.getElementById("user-account") as HTMLInputElement).value=null;
        (document.getElementById("confirm-password") as HTMLInputElement).value=null;
        (document.getElementById("user-account") as HTMLInputElement).style.borderColor="red";
        (document.getElementById("confirm-password") as HTMLInputElement).style.borderColor="black";
        (document.getElementById("user-password") as HTMLInputElement).style.borderColor="black";
        temp8.style.display="none";
        temp3.checked=false;
        temp4.checked=false;
        return;
      }else{
        continue;
      }
    }
    if(indexc==this.user.length){
      let temp16;
      if(temp3.checked==true){
        temp16="traveller";
      }if(temp4.checked==true){
        temp16="manager";
        //create one resp in hotels database
        console.log(temp0);
        this.hmService.addHotel("",temp0,"", "", "","",  "", "", "", "");

      }
      (document.getElementById("user-account") as HTMLInputElement).style.borderColor="black";
      (document.getElementById("user-password") as HTMLInputElement).style.borderColor="black";
      (document.getElementById("confirm-password") as HTMLInputElement).style.borderColor="black";
      temp8.style.display="none";
      alert("Seccuss!!");

      (document.getElementById("user-password") as HTMLInputElement).value=null;
      (document.getElementById("user-account") as HTMLInputElement).value=null;
      (document.getElementById("confirm-password") as HTMLInputElement).value=null;
      temp3.checked=false;
      temp4.checked=false;
      this.userService.addUser(temp0,temp1,temp16);
      //this.ngOnInit();
      window.location.reload();
    }
  }
  }


  checklogin(){
      this.ngOnInit();
      this.user = this.user;
      //Check if there are empty fields
      let temp9 = (document.getElementById("login-user-account") as HTMLInputElement).value;
      let temp10 = (document.getElementById("login-user-password") as HTMLInputElement).value;
      if(temp9===""||temp10===""){
        alert("Please enter all fields.");
        (document.getElementById("login-user-account") as HTMLInputElement).value=null;
        (document.getElementById("login-user-password") as HTMLInputElement).value=null;
        return;
      }else{//See if the account exist
        console.log(this.user);
        for(var index = 0; index<this.user.length;index++){
          if(temp9==this.user[index].UserAccount){
            //alert("find");
            if(temp10==this.user[index].UserPassword){
            (document.getElementById("login-user-account") as HTMLInputElement).value=null;
            (document.getElementById("login-user-password") as HTMLInputElement).value=null;
            if(this.user[index].Role=="manager"){
            alert("Welcome "+this.user[index].Role+"!");
            //this.user.length = this.user.length+1;
            //window.open("/hmmain","_self");
            //direct to the hotel manager page
            console.log(this.user[index].UserAccount);
            const navigationExtras: NavigationExtras = {
              queryParams: {
               "managerID" : this.user[index].UserAccount,
              }
            };
            this.router.navigate(['/hmmain'], navigationExtras);
            return;
          }if(this.user[index].Role=="traveller"){
            alert("Welcome "+this.user[index].Role+"!");
           // this.user.length = this.user.length+1;
            const NavigationExtras: NavigationExtras = {
              queryParams: {
                "userId" : this.user[index].UserAccount,
              }
            };
            // window.open("/hotels","_self");
            this.router.navigate(['/hotels'], NavigationExtras);
            return;
          }
          }else{
            (document.getElementById("login-user-password") as HTMLInputElement).value=null;
            alert("Your password is incorrect.");
            return;
          }
          }else{
            continue;
          }
        }if(index==this.user.length){
            console.log(index);
            alert("No such account.");
            (document.getElementById("login-user-account") as HTMLInputElement).value=null;
            (document.getElementById("login-user-password") as HTMLInputElement).value=null;
            return;
        }
      }
  }



  ngOnInit() {
    this.http.get<{user: user[]}>('http://localhost:3000/users').subscribe((userData) => {

    this.user = userData.user;
    console.log(userData.user);
    console.log(this.user.length);

    });
  }

}
