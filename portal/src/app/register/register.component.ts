import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MessageService } from '../common-plugin/message.service';
import { I18NService } from '../common-plugin/i18-nservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userName:string = "";
  password:string = "";
  rePassword:string = "";
  email:string = "";
  sex:string = "1";
  passwordDiff:boolean = false;
  constructor(
    private appService: AppService,
    private messageService: MessageService,
    private i18N:I18NService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
  }

  checkPasswordDiff(){
    if(this.rePassword==""){
      this.passwordDiff = false;
      return;
    }
    if(this.password!=this.rePassword){
      this.passwordDiff = true;
    }else{
      this.passwordDiff = false;
    }
  }

  register(){
    let kwargs = {
      'user_name': this.userName,
      'password': this.password,
      're_password': this.rePassword,
      'email': this.email,
      'sex': this.sex
    }
    if(this.password!=this.rePassword){
      this.messageService.error(this.i18N.getI18N("The two passwords are inconsistent"))
      return;
    }
    this.appService.register(kwargs).subscribe((msg)=>{
      console.log("register success", msg);
      this.messageService.success(msg);
      this.router.navigate(["../register-confirm"],{relativeTo: this.activatedRoute, queryParams:{'msg':msg}});
    },error=>{
      console.log("register failed", error);
      this.messageService.error(error.error);
      this.router.navigate(["../login"],{relativeTo: this.activatedRoute,queryParams:{'userName':this.userName}});
    })
    

  }

}
