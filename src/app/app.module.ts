import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
    HttpClientModule,
    MultiSelectAllModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
