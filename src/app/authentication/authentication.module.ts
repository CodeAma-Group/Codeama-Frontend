import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ModuleoutletComponent } from './moduleoutlet/moduleoutlet.component';
import { LoginformComponent } from './loginform/loginform.component';
import { SignupformComponent } from './signupform/signupform.component';
import { SignupfacerecoComponent } from './signupfacereco/signupfacereco.component';
import { LoginfacerecoComponent } from './loginfacereco/loginfacereco.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    ModuleoutletComponent, 
    LoginformComponent, 
    SignupformComponent, 
    SignupfacerecoComponent, 
    LoginfacerecoComponent, LoginComponent, SignupComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
