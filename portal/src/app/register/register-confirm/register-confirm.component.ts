import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.css']
})
export class RegisterConfirmComponent implements OnInit {
  msg:string = ""
  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe((params)=>{
      this.msg = params.msg;
    })
  }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(["../login/"],{relativeTo:this.activatedRoute});
    }, 3000);
  }

}
