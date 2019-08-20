import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoinputComponent } from './todoinput/todoinput.component';
import { ListComponent } from './list/list.component';
import { DataService } from './todoinput/data.service';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { HeaderComponent } from './header/header.component';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


import { AuthInterceptor } from './login/auth-interceptor';


import {
  MatInputModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatCardModule,
  MatIconModule,
  MatGridListModule,
  MatStepperModule,
  MatSidenavModule
} from '@angular/material';
import { ProfileComponent } from './profile/profile.component';
import { ProfileupdateComponent } from './profile/profileupdate/profileupdate.component';
import { ProfileService } from './profile/profile.service';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    TodoinputComponent,
    ListComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    ProfileComponent,
    ProfileupdateComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,



    MatInputModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatStepperModule,
    MatSidenavModule,


  ],
  providers: [
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
