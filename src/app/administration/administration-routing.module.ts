import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGroupComponent } from './admin-group/admin-group.component';
import { CodeamasComponent } from './codeamas/codeamas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModuleoutletComponent } from './moduleoutlet/moduleoutlet.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { OurUsersComponent } from './our-users/our-users.component';

const routes: Routes = [
  {
    path: '',
    component: ModuleoutletComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard', 
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'our-users',
        component: OurUsersComponent,
        pathMatch: 'full'
      },
      {
        path: 'codeamas',
        component: CodeamasComponent,
        pathMatch: 'full'
      },
      {
        path: 'admin-group',
        component: AdminGroupComponent,
        pathMatch: 'full'
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        pathMatch: 'full'
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
