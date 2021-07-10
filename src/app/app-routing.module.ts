import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CodeamasComponent } from './innerapplication/codeamas/codeamas.component';
import { ProfileComponent } from './innerapplication/profile/profile.component';
import { ProjectDetailsComponent } from './innerapplication/project-details/project-details.component';

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
    component: CodeamasComponent,
    children: [  
      {
        path: '', component: ProfileComponent
      },
      {
        path: 'profile', component: ProfileComponent
      },
    ]
  },
  {
   path: 'profile', component: ProfileComponent,
   children: [
     {
      path: 'projectDetails',
      component: ProjectDetailsComponent
     }
   ]
    
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