import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import {AuthGuard} from './login/auth.guard';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { firebaseConfig } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { HistoryComponent } from './history/history.component';

import { WikipediaService } from './wikipedia.service';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { HistoryService } from './history/history.service';
import { GoogleTranslateService } from './google-translate.service';
import { TextSectionComponent } from './text-section/text-section.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    HistoryComponent,
    TextSectionComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [LoginService,
              AuthGuard,
              RegisterService,
              WikipediaService,
              HistoryService,
              GoogleTranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
