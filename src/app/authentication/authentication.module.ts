import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ModuleoutletComponent } from './moduleoutlet/moduleoutlet.component';


@NgModule({
  declarations: [ModuleoutletComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
