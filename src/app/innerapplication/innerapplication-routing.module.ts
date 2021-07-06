import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModuleoutletComponent } from './moduleoutlet/moduleoutlet.component'

const routes: Routes = [

  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  },
  {
    path: 'app',
    component: ModuleoutletComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InnerapplicationRoutingModule { }
