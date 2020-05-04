import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class I18NService{

  constructor(
    private translate:TranslateService
  ) {
   }

  getI18N(key){
    let value = ""
    this.translate.get(key).subscribe((res:string)=>{
      value = res;
    })
    return value;
  }
}
