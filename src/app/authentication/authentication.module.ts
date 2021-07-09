import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcamModule } from 'ngx-webcam';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ModuleoutletComponent } from './moduleoutlet/moduleoutlet.component';
import { LoginformComponent } from './loginform/loginform.component';
import { SignupformComponent } from './signupform/signupform.component';
import { SignupfacerecoComponent } from './signupfacereco/signupfacereco.component';
import { LoginfacerecoComponent } from './loginfacereco/loginfacereco.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CameraComponent } from './camera/camera.component';


@NgModule({
  declarations: [
    ModuleoutletComponent, 
    LoginformComponent, 
    SignupformComponent, 
    SignupfacerecoComponent, 
    LoginfacerecoComponent, LoginComponent, SignupComponent, CameraComponent
  ],
  imports: [
    CommonModule,
    WebcamModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
