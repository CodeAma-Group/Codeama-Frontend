import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModuleoutletComponent } from './moduleoutlet/moduleoutlet.component';
import { HoodComponent } from './hood/hood.component';
import { ProjectsComponent } from './projects/projects.component';
import { ChallengesComponent } from './challenges/challenges.component';
import { CodeamasComponent } from './codeamas/codeamas.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SupportComponent } from './support/support.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectRegistrationComponent } from './project-registration/project-registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { QuestionsComponent } from './questions/questions.component';
import { CreateChallengeComponent } from './create-challenge/create-challenge.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full',
  },
  {
    path: 'app',
    component: ModuleoutletComponent,
    children: [
      {
        path: '',
        redirectTo: 'hood',
        pathMatch: 'full',
      },
      {
        path: 'hood',
        // component: HoodComponent,
        component: DashboardComponent,
        children: [
          {
            path: '',
            component: CoursesComponent
          },
          {
            path:'courses',
            component: CoursesComponent
          },
          {
            path: 'questions',
            component: QuestionsComponent
          }
        ]
      },
      {
        path: 'projects',
        component: ProjectsComponent,
      },
      {
        path: 'projectRegistration',
        component: ProjectRegistrationComponent,
      },
      {
        path: 'projectDetails/:id',
        component: ProjectDetailsComponent,
      },
      {
        path: 'challenges',
        component: ChallengesComponent
      },
      {
        path: 'challenges/apply',
        component: CreateChallengeComponent
      },
      {
        path: 'codeamas',
        component: CodeamasComponent,
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      {
        path: 'support',
        component: SupportComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InnerapplicationRoutingModule {}
