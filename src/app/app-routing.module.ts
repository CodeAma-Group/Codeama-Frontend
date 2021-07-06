import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutUsComponent} from './about-us/about-us.component';
import {ChallengesComponent} from './challenges/challenges.component';
import {CodeAmasComponent} from './code-amas/code-amas.component';
import {NotificationsComponent} from './notifications/notifications.component'
import {ProfileComponent} from './profile/profile.component'
import {HoodComponent} from './hood/hood.component'
import {SupportComponent} from './support/support.component';

const routes: Routes = [
  {path:"hood", component:HoodComponent},
  {path:"profile", component:ProfileComponent},
  {path:"notifications", component:NotificationsComponent},
  {path:"challenges", component:ChallengesComponent},
  {path:"codeAmas", component:CodeAmasComponent},
  {path:"aboutUs", component:AboutUsComponent},
  {path:"support", component:SupportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
