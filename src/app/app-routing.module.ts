import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoinputComponent } from './todoinput/todoinput.component';
import { ListComponent } from './list/list.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { AuthGuard } from './login/auth-guard';
import { ProfileComponent } from './profile/profile.component';
import { ProfileupdateComponent } from './profileupdate/profileupdate.component';

const routes: Routes = [{
  path:'',
  component:ListComponent,
  canActivate:[AuthGuard]
},{
  path:'newPost',
  component:TodoinputComponent,
  canActivate:[AuthGuard]
},{
  path:'edit/:id',
  component:TodoinputComponent,
  canActivate:[AuthGuard]
},{
  path:'signIn',
  component:SignInComponent
},{
  path:'signUp',
  component:SignUpComponent
},{
  path:'profile',
  component:ProfileComponent,
  canActivate:[AuthGuard]
},{
  path:'profileUpdate',
  component:ProfileupdateComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
