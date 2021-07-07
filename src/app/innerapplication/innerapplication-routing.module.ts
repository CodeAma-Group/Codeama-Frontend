import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModuleoutletComponent } from './moduleoutlet/moduleoutlet.component'
import { HoodComponent } from './hood/hood.component'
import { ProjectsComponent } from './projects/projects.component'
import { ChallengesComponent } from './challenges/challenges.component'
import { CodeamasComponent } from './codeamas/codeamas.component'
import { NotificationsComponent } from './notifications/notifications.component'
import { SupportComponent } from './support/support.component'
import { ProfileComponent } from './profile/profile.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionsComponent } from './questions/questions.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  },
  {
    path: 'app',
    component: ModuleoutletComponent,
    children: [

      {
        path: '',
        redirectTo: 'hood',
        pathMatch: 'full'
      },
      {
        path: 'hood',
        component: DashboardComponent,
        children: [
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
        component: ProjectsComponent
      },
      {
        path: 'challenges',
        component: ChallengesComponent
      },
      {
        path: 'codeamas',
        component: CodeamasComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: 'support',
        component: SupportComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InnerapplicationRoutingModule { }
