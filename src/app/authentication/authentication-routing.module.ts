import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModuleoutletComponent } from './moduleoutlet/moduleoutlet.component'
import { SignupComponent } from './signup/signup.component'
import { LoginComponent } from './login/login.component'
import { LoginformComponent } from './loginform/loginform.component'
import { SignupformComponent } from './signupform/signupform.component'
import { LoginfacerecoComponent } from './loginfacereco/loginfacereco.component'
import { SignupfacerecoComponent } from './signupfacereco/signupfacereco.component'

const routes: Routes = [
  {
    path: '',
    component: ModuleoutletComponent,
    children: [

      {
        path: '',
        redirectTo: 'login', 
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        children: [
          {
            path: '',
            redirectTo: 'form', 
            pathMatch: 'full'
          },
          {
            path: 'form',
            component: LoginformComponent 
          },
          {
            path: 'face',
            component: LoginfacerecoComponent
          }
        ]
      },
      {
        path: 'signup',
        component: SignupComponent,
        children: [
          {
            path: '',
            redirectTo: 'form', 
            pathMatch: 'full'
          },
          {
            path: 'form',
            component: SignupformComponent   
          },
          {
            path: 'face',
            component: SignupfacerecoComponent
          }
        ]
      },

    ]
  }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
