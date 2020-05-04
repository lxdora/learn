import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http:HttpClient
  ) { }

  login(values){
    let url = "/mysite/login";
    let kwargs = values;
    return this.http.post(url,kwargs);
  }

  refreshCaptcha(){
    let url = "/mysite/captcha/refresh/";
    let kwargs = {};
    return this.http.post(url,kwargs);
  }
}
