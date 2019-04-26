import { Injectable } from '@angular/core';
import { user } from './user.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: user[] = [];
  private usersUpdated = new Subject<user[]>();

  constructor(private http: HttpClient) { }

  getUsers() {
    this.http.get<{user: user[]}>('http://localhost:3000/users').subscribe((userData) => {
       
    this.user = userData.user;
    //console.log(userData.user[0]); 
    this.usersUpdated.next([...this.user]);
    
    });
  }
  getUsersUpdatedListener() {
    return this.usersUpdated.asObservable();
  }

  addUser(UserAccount: string, UserPassword: string, Role: string){
    const user: user = {
      UserAccount: UserAccount,
      UserPassword: UserPassword,
      Role: Role
    };
    console.log(user.UserAccount);
    this.http.post('http://localhost:3000/users', user).subscribe((responseData) =>{
        this.user.push(user);
        this.usersUpdated.next([...this.user]);
    });
  }
}
