import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InnerapplicationRoutingModule } from './innerapplication-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ModuleoutletComponent } from './moduleoutlet/moduleoutlet.component';


@NgModule({
  declarations: [SidebarComponent, ModuleoutletComponent],
  imports: [
    CommonModule,
    InnerapplicationRoutingModule
  ]
})
export class InnerapplicationModule { }
