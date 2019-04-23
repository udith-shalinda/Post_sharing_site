import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoinputComponent } from './todoinput/todoinput.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
