import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OurUsersComponent } from './our-users/our-users.component';
import { CodeamasComponent } from './codeamas/codeamas.component';
import { ModuleoutletComponent } from './moduleoutlet/moduleoutlet.component';
import { AdminGroupComponent } from './admin-group/admin-group.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [SidebarComponent, DashboardComponent, OurUsersComponent, CodeamasComponent, ModuleoutletComponent, AdminGroupComponent, NotificationsComponent, HeaderComponent],
  imports: [
    NgxSpinnerModule,
    CommonModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
