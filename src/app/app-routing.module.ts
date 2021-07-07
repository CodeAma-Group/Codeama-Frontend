import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CodeamasComponent } from './innerapplication/codeamas/codeamas.component';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module')
      .then(mode => mode.AuthenticationModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./innerapplication/innerapplication.module')
      .then(mode => mode.InnerapplicationModule)
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'codeamas',
    component: CodeamasComponent
  },
  {
    path: '**', //wildcard routing
    component: PageNotFoundComponent
  } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }