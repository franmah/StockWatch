import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CompanySummaryComponent } from './company-summary/company-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CompanySummaryComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
