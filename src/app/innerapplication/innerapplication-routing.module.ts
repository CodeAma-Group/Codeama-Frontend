import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModuleoutletComponent } from './moduleoutlet/moduleoutlet.component';
// import { HoodComponent } from './hood/hood.component';
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
import { AddQuestionComponent } from './add-question/add-question.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { ResourcesComponent } from './resources/resources.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { AnswerQuestionComponent } from './answer-question/answer-question.component';
import { BugsComponent } from './dashboard/bugs/bugs.component';
import { AddBugComponent } from './dashboard/add-bug/add-bug.component';
import { AskcodeamaComponent } from './askcodeama/askcodeama.component';
import { UseransweredComponent } from './userprofile/useranswered/useranswered.component';
import { UserarticlesComponent } from './userprofile/userarticles/userarticles.component';
import { UseraskedComponent } from './userprofile/userasked/userasked.component';
import { UserbugsolvedComponent } from './userprofile/userbugsolved/userbugsolved.component';
import { UserresourcesComponent } from './userprofile/userresources/userresources.component';
import { AuthGuard } from '../authentication/common/auth.guard';
import { BugDetailsComponent } from './dashboard/bug-details/bug-details.component';

const routes: Routes = [
  {
    path: '',
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
            path:'articles',
            component: CoursesComponent
          },
          {
            path: 'questions',
            component: QuestionsComponent
          },
          {
            path: 'resources',
            component: ResourcesComponent
          },
          {
            path: 'bugs',
            component:BugsComponent
          }
        ]
      },
      {
        path: 'projects',
        component: ProjectsComponent,
      },
      {
        path:"add-question",
        component:AddQuestionComponent
      },
      {
        path:"add-article",
        component: AddArticleComponent
      },
      {
        path: "add-resource",
        component: AddResourceComponent
      },
      {
        path: "answer-question",
        component:AnswerQuestionComponent
      },
      {
        path: "add-bug",
        component: AddBugComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "bug-details",
        component: BugDetailsComponent,
        canActivate: [AuthGuard]
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
        component: ChallengesComponent,
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
        path: 'profile/:username',
        component: ProfileComponent,
        children: [
          
          {
            path: '',
            redirectTo: 'articles',
            pathMatch: 'full',
          },
          {
            path: 'articles',
            component: UserarticlesComponent
          },
          {
            path: 'answered',
            component: UseransweredComponent
          },
          {
            path: 'asked',
            component: UseraskedComponent
          },
          {
            path: 'bugsolved',
            component: UserbugsolvedComponent
          },
          {
            path: 'resources',
            component: UserresourcesComponent
          }

        ]
      },
      {
        path: 'askquestion',
        component: AskcodeamaComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InnerapplicationRoutingModule {}
