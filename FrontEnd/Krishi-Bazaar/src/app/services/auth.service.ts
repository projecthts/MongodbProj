import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userEmail = new BehaviorSubject<any>({});
  private emailToggle = new BehaviorSubject<boolean>(true);

  constructor(private httpClient: HttpClient, private cs: CookieService) { }

  setEmailToggle(){
    this.emailToggle.next(!this.emailToggle);
  }

  getEmailToggle(){
    return this.emailToggle.asObservable();
  }

  // setUserEmail(value: any){
  //   this.userEmail.next(value);
  // }

  // getUserEmail(){
  //   return this.userEmail.asObservable();
  // }

  getUser(){
     console.log(`connect.sid=${this.cs.get("connect.sid")}`);
    return this.httpClient.get<any>("http://localhost:5001/v1/users/user", {withCredentials: true});
  }

  logout(){
    return this.httpClient.post<any>("http://localhost:5001/v1/users/logout", {}, {withCredentials: true});
  }

  getProfile(uid:any){
    return this.httpClient.get<any>("http://localhost:5001/v1/users/profile" + "?uid=" + uid);
  }

}