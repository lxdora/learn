import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'portal';
  currentLanguage:string = "zh";
  isLogin:boolean = false;
  userName:string = "";
  constructor(
    private translate:TranslateService,
    private router:Router,
    private appService: AppService,
    private activatedRoute:ActivatedRoute
    ){
    translate.addLangs(['en', 'zh']);
    translate.setDefaultLang('zh');
    translate.use('zh');
  }
  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    if(localStorage.getItem('isLogin')=="true"){
      this.isLogin = true;
    }else{
      this.isLogin = false;
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

  logout(){
    localStorage.clear();
    this.isLogin = false;
    this.appService.logOut().subscribe(()=>{
      this.router.navigate(['../login/'], {relativeTo:this.activatedRoute});
    })
  }


}
