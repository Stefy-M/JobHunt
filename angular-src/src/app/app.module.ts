import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CompanyAddComponent } from './components/company-add/company-add.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import {ValidateService} from './services/validate.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthService} from './services/auth.service';

const appRoutes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'profile', component: ProfileComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'company-add', component: CompanyAddComponent },
  {path: 'company-list', component: CompanyListComponent }

]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CompanyAddComponent,
    CompanyListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot()
    
  ],
  providers: [ValidateService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
