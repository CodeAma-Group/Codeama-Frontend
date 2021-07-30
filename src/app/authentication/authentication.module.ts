import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcamModule } from 'ngx-webcam';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ModuleoutletComponent } from './moduleoutlet/moduleoutlet.component';
import { LoginformComponent } from './loginform/loginform.component';
import { SignupformComponent } from './signupform/signupform.component';
import { SignupfacerecoComponent } from './signupfacereco/signupfacereco.component';
import { LoginfacerecoComponent } from './loginfacereco/loginfacereco.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';
import { EmailverifiedComponent } from './emailverified/emailverified.component';

@NgModule({
	declarations: [
		ModuleoutletComponent, 
		LoginformComponent, 
		SignupformComponent, 
		SignupfacerecoComponent, 
		LoginfacerecoComponent, 
		LoginComponent, 
		SignupComponent, 
		VerifyemailComponent, 
		EmailverifiedComponent
	],
	imports: [
		CommonModule,
		WebcamModule,
		AuthenticationRoutingModule,
		FormsModule,
		HttpClientModule
	],	
})
export class AuthenticationModule { }
