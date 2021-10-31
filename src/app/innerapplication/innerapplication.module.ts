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
import { BadgeComponent } from './components/badge/badge.component';
import { CreateChallengeComponent } from './create-challenge/create-challenge.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddArticleComponent } from './add-article/add-article.component';
import { ResourcesComponent } from './resources/resources.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { AnswerQuestionComponent } from './answer-question/answer-question.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BugsComponent } from './dashboard/bugs/bugs.component';
import { AddBugComponent } from './dashboard/add-bug/add-bug.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { AskcodeamaComponent } from './askcodeama/askcodeama.component';
import { UserresourcesComponent } from './userprofile/userresources/userresources.component';
import { UseransweredComponent } from './userprofile/useranswered/useranswered.component';
import { UseraskedComponent } from './userprofile/userasked/userasked.component';
import { UserbugsolvedComponent } from './userprofile/userbugsolved/userbugsolved.component';
import { UserarticlesComponent } from './userprofile/userarticles/userarticles.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BugDetailsComponent } from './dashboard/bug-details/bug-details.component';
import { AmaQuestionComponent } from './ama-question/ama-question.component';
import { QuestionComponent } from './ama-question/question/question.component';
import { InfoBoxComponent } from './ama-question/question/info-box/info-box.component';
import { ViewChallengeTakersComponent } from './view-challenges/view-challenge-takers.component';
import { ChallengeTakerComponent } from './view-challenges/challenge-taker/challenge-taker.component';
import { TakeChallengeBoardComponent } from './take-challenge-board/take-challenge-board.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddChallengeComponent } from './add-challenge/add-challenge.component';
import { AddBadgeComponent } from './add-challenge/add-badge/add-badge.component';
import { ViewArticleComponent } from './view-article/view-article.component';
import { AdminChallengeComponent } from './admin-challenge/admin-challenge.component';
import { EditChallengeComponent } from './edit-challenge/edit-challenge.component';
import { AppEditBadgeComponent } from './edit-challenge/app-edit-badge/app-edit-badge.component';
import { AllChallengesComponent } from './all-challenges/all-challenges.component';
import { AmaAnswerQuestionComponent } from './ama-answer-question/ama-answer-question.component';
import { CardBoxComponent } from './admin/dashboard/card-box/card-box.component';
import { ActivitiesBoxComponent } from './admin/dashboard/activities-box/activities-box.component';
import { OtherInfoComponent } from './admin/dashboard/other-info/other-info.component';
const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 20,
		},
		vertical: {
			position: 'bottom',
			distance: 20,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [SidebarComponent, ModuleoutletComponent, HoodComponent, ProjectsComponent, ChallengesComponent, NotificationsComponent, SupportComponent, CodeamasComponent, ProfileComponent, DashboardComponent, QuestionsComponent, CoursesComponent,ProjectRegistrationComponent,ProjectDetailsComponent, BadgeComponent, CreateChallengeComponent, AddQuestionComponent,AnswerQuestionComponent, AddArticleComponent, ResourcesComponent, AddResourceComponent, BugsComponent, AddBugComponent, AskcodeamaComponent, UserresourcesComponent, UseransweredComponent, UseraskedComponent, UserbugsolvedComponent, UserarticlesComponent, AmaQuestionComponent,BugDetailsComponent, QuestionComponent, InfoBoxComponent, ViewChallengeTakersComponent, ChallengeTakerComponent, TakeChallengeBoardComponent, AddChallengeComponent, AddBadgeComponent, ViewArticleComponent, AdminChallengeComponent, EditChallengeComponent, AppEditBadgeComponent, AllChallengesComponent, AmaAnswerQuestionComponent, CardBoxComponent, ActivitiesBoxComponent, OtherInfoComponent],
  imports: [
    CommonModule,
    InnerapplicationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CodemirrorModule,
    AngularEditorModule,
    MultiSelectAllModule,
    NgxSpinnerModule,
    NgbModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
})
export class InnerapplicationModule { }
