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
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CardBoxComponent } from './dashboard/card-box/card-box.component';
import { ActivitiesBoxComponent } from './dashboard/activities-box/activities-box.component';
import { OtherInfoComponent } from './dashboard/other-info/other-info.component';
import { GraphComponent } from './dashboard/graph/graph.component';
import { AmaItemComponent } from './dashboard/other-info/ama-item/ama-item.component';
import { BarChartComponent } from './dashboard/other-info/bar-chart/bar-chart.component';
@NgModule({
  declarations: [SidebarComponent, DashboardComponent, OurUsersComponent, CodeamasComponent, ModuleoutletComponent, AdminGroupComponent, NotificationsComponent, HeaderComponent, CardBoxComponent, ActivitiesBoxComponent, OtherInfoComponent, GraphComponent, AmaItemComponent, BarChartComponent],
  imports: [
    NgxSpinnerModule,
    CommonModule,
    AdministrationRoutingModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule
  ]
})
export class AdministrationModule { }
