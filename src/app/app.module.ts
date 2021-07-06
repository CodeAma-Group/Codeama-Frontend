import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HoodComponent } from './hood/hood.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ChallengesComponent } from './challenges/challenges.component';
import { CodeAmasComponent } from './code-amas/code-amas.component';
import { SupportComponent } from './support/support.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HoodComponent,
    AboutUsComponent,
    ChallengesComponent,
    CodeAmasComponent,
    SupportComponent,
    ProfileComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
