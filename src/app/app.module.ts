import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { AuthService } from './authentication/_authServices/auth.service'
import { AuthGuard } from './authentication/common/auth.guard'
import { AuthinterceptorService } from './authentication/_authServices/authinterceptor.service'
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotifierModule } from 'angular-notifier';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CodemirrorModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MultiSelectAllModule,
    NgxSpinnerModule,
    NotifierModule
  ],
  providers: [
    AuthService,
		AuthGuard,
		{
      provide: HTTP_INTERCEPTORS,
			useClass: AuthinterceptorService,
			multi: true
		}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
