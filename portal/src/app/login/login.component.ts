import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { LoginService } from './login-service.service';
import { MessageService } from '../common-plugin/message.service';
import { I18NService } from '../common-plugin/i18-nservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConditionalExpr } from '@angular/compiler';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName:string = "";
  password:string = "";
  captcha:string = "";
  captchaUrl:string = "";
  constructor(
    private loginService: LoginService,
    private messageService:MessageService,
    private i18n:I18NService,
    private router:Router,
    private appService: AppService,
    private activatedRoute:ActivatedRoute
  ) {
   }

  ngOnInit() {
    // 从注册页面过来
    this.activatedRoute.paramMap.subscribe((params)=>{
      this.userName = params.get('userName');
    })
  }

  register(){
    this.router.navigate(['../register'], {relativeTo:this.activatedRoute});
  }

  // 登录
  login(){
    let values = {
      'username': this.userName,
      'password': this.password
    }
    if(this.userName==""){
      this.messageService.error(this.i18n.getI18N("please input username"));
      return;
    }
    if(this.password == ""){
      this.messageService.error(this.i18n.getI18N("please input password"));
      return;
    }
    this.loginService.login(values).subscribe((res)=>{
      console.log('res', res);
      localStorage.setItem('userName',res['user_name']);
      localStorage.setItem('isLogin', res['is_login']);
      this.router.navigate(['../index'],{relativeTo:this.activatedRoute,queryParams:{userName:res['user_name'],isLogin:res['is_login']}});
    },error=>{
      console.log('error',error);
      if(error.status==301 && error.error.user_name != undefined){
        this.appService.userName = error.error.user_name;
        this.appService.isLogin = error.error.is_login;
        this.messageService.error(this.i18n.getI18N("you already login"));
        this.router.navigate(['../index'],{relativeTo:this.activatedRoute});
      }else{
        this.router.navigate(['../register/register-confirm/'],{relativeTo:this.activatedRoute});
      }
      this.messageService.error(error.error);
    }
    );

  }

  forgetPassword(){

  }

  refreshCaptcha(){
    this.loginService.refreshCaptcha().subscribe(result=>{
      console.log('result', result);
      
    })
  }

}
