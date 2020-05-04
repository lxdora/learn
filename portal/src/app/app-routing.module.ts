import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { RegisterConfirmComponent } from './register/register-confirm/register-confirm.component';


const routes: Routes = [
  {path: '', component: IndexComponent},
  {path:'portal',
    children:[
      {path:'index', component:IndexComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path:'register-confirm', component: RegisterConfirmComponent}
    ]
},
  {path: 'portal/index', component: IndexComponent},
  {path: 'portal/login', component: LoginComponent},
  {path: 'portal/register', component: RegisterComponent},
  {path:'register-confirm', component: RegisterConfirmComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
