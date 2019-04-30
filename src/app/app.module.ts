import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoinputComponent } from './todoinput/todoinput.component';
import { ListComponent } from './list/list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatFormFieldModule, MatExpansionModule, MatButtonModule, MatProgressSpinnerModule, MatToolbarModule, MatPaginatorModule } from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { DataService } from './todoinput/data.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoinputComponent,
    ListComponent
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
    MatPaginatorModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
