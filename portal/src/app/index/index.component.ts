import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  isLogin:boolean = false;
  userName:string = "";
  currentLanguage:string = "zh";
  constructor(
    private translate:TranslateService,
    private router:Router,
    private appService: AppService,
    private activatedRoute:ActivatedRoute
  ) { 
    this.activatedRoute.queryParams.subscribe(params=>{
      this.userName = params.userName;
      this.isLogin = params.isLogin;
    })
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    if(localStorage.getItem('isLogin')=="false"){
      this.isLogin = false;
    }else{
      this.isLogin = true;
    }
  }

  changeLanguage(): void {
    if ('en' === this.currentLanguage) {
        this.translate.use('zh');
        this.currentLanguage = 'zh';
    } else if ( 'zh' === this.currentLanguage ) {
        this.translate.use('en');
        this.currentLanguage = 'en';
    }
  }

}
