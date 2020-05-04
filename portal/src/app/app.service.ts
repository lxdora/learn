import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  userName:string = "";
  isLogin:boolean = false;
  constructor(
    private http: HttpClient
  ) { }

  setUserName(userName){
    this.userName = userName;
  }

  getUserName(){
    return this.userName;
  }

  setIsLogin(isLogin){
    this.isLogin = isLogin;
  }

  getIsLogin(){
    return this.isLogin;
  }

  register(values){
    let url = "/mysite/register/";
    let kwargs = values;
    return this.http.post(url,kwargs);
  }

  logOut(){
    let url = "/mysite/logout/";
    let kwargs = {};
    return this.http.post(url,kwargs);
  }
}
