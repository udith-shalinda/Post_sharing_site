import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoinputComponent } from './todoinput/todoinput.component';
import { ListComponent } from './list/list.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';

const routes: Routes = [{
  path:'',
  component:ListComponent
},{
  path:'newPost',
  component:TodoinputComponent
},{
  path:'edit/:id',
  component:TodoinputComponent
},{
  path:'signIn',
  component:SignInComponent
},{
  path:'signUp',
  component:SignUpComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
