import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InnerapplicationRoutingModule } from './innerapplication-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ModuleoutletComponent } from './moduleoutlet/moduleoutlet.component';
import { HoodComponent } from './hood/hood.component';
import { ProjectsComponent } from './projects/projects.component';
import { ChallengesComponent } from './challenges/challenges.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SupportComponent } from './support/support.component';
import { CodeamasComponent } from './codeamas/codeamas.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectRegistrationComponent } from './project-registration/project-registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionsComponent } from './questions/questions.component';
import { CoursesComponent } from './courses/courses.component';
import { EditorComponent } from './project-registration/editor/editor.component';


@NgModule({
  declarations: [SidebarComponent, ModuleoutletComponent, HoodComponent, ProjectsComponent, ChallengesComponent, NotificationsComponent, SupportComponent, CodeamasComponent, ProfileComponent, DashboardComponent, QuestionsComponent, CoursesComponent,ProjectRegistrationComponent,ProjectDetailsComponent, EditorComponent],
  imports: [
    CommonModule,
    InnerapplicationRoutingModule
  ]
})
export class InnerapplicationModule { }
