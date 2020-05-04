import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private toastrService:ToastrService
  ) { }

  success(msg,title="",time=3000){
    this.toastrService.success(msg, title, {timeOut: time, closeButton:true})
  }
  info(msg,title="",time=3000){
    this.toastrService.info(msg, title, {timeOut: time, closeButton:true})
  }
  show(msg,title="",time=3000){
    this.toastrService.show(msg, title, {timeOut: time, closeButton:true})
  }
  warning(msg,title="",time=10000){
    this.toastrService.warning(msg, title, {timeOut: time, closeButton:true})
  }
  error(msg,title="",time=50000){
    this.toastrService.error(msg, title, {timeOut: time, closeButton:true})
  }

}
