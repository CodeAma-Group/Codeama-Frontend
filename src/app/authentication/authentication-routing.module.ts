import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModuleoutletComponent } from './moduleoutlet/moduleoutlet.component'
import { LoginformComponent } from './loginform/loginform.component'
import { SignupformComponent } from './signupform/signupform.component'
import { LoginfacerecoComponent } from './loginfacereco/loginfacereco.component'
import { SignupfacerecoComponent } from './signupfacereco/signupfacereco.component'

const routes: Routes = [

  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: ModuleoutletComponent,
    children: [

      {
        path: '',
        redirectTo: 'login', 
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginformComponent
      },
      {
        path: 'signup',
        component: SignupformComponent
      },
      {
        path: 'Loginfacerecongtn',
        component: LoginfacerecoComponent
      },
      {
        path: 'signupfacerecongtn',
        component: SignupfacerecoComponent
      }

    ]
  }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
