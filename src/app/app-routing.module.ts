import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoinputComponent } from './todoinput/todoinput.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [{
  path:'',
  component:ListComponent
},{
  path:'newPost',
  component:TodoinputComponent
},{
  path:'edit/:id',
  component:TodoinputComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
