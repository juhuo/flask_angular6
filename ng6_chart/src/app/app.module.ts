import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
 
import { WeatherService } from './weather.service';
import { CcmtsService } from './ccmts.service';

import { AppComponent } from './app.component';
import { ChartjsComponent } from './chartjs/chartjs.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './messages/messages.component';

import { MatDialogModule } from '@angular/material';
import { MyAlertDialogComponent } from './my-alert-dialog/my-alert-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartjsComponent,
    DashboardComponent,
    MessagesComponent,
    MyAlertDialogComponent
  ],
  
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
     FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  providers: [WeatherService, CcmtsService],

  bootstrap: [AppComponent],

  entryComponents: [
    // See https://material.angular.io/components/dialog/overview#configuring-dialog-content-via-code-entrycomponents-code- for more info
    MyAlertDialogComponent
  ]
})
export class AppModule { }
