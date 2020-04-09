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
import {AuthGuard} from './guards/auth.guard';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';  
import {TableModule} from 'primeng/table';                //api
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'profile', component: ProfileComponent,canActivate: [AuthGuard] },
  {path: 'register', component: RegisterComponent },
  {path: 'company-add', component: CompanyAddComponent, canActivate: [AuthGuard]  },
  {path: 'company-list', component: CompanyListComponent, canActivate: [AuthGuard]  }

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
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    AccordionModule,
    BrowserAnimationsModule,
    TableModule,
    ButtonModule,
    DialogModule
    
    
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
