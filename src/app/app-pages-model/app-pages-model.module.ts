import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppPagesModelRoutingModule } from './app-pages-model-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ModelOutletComponent } from './model-outlet/model-outlet.component';


@NgModule({
  declarations: [SidebarComponent, ModelOutletComponent],
  imports: [
    CommonModule,
    AppPagesModelRoutingModule
  ]
})
export class AppPagesModelModule { }
