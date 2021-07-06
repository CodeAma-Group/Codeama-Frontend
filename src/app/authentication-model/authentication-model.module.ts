import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationModelRoutingModule } from './authentication-model-routing.module';
import { ModelOutletComponent } from './model-outlet/model-outlet.component';


@NgModule({
  declarations: [ModelOutletComponent],
  imports: [
    CommonModule,
    AuthenticationModelRoutingModule
  ]
})
export class AuthenticationModelModule { }
