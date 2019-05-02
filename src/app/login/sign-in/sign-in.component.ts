import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  SignInForm:FormGroup;
  private authStatusSub:Subscription;
  private errorSub:Subscription;
  private errorMessage:string;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.SignInForm = new FormGroup({
      'email': new FormControl(),
      'password' : new FormControl()
    });
    this.authStatusSub = this.authService.getAuthStatusListner().subscribe(authstatus=>{
      
    });
    this.errorSub = this.authService.getErrorMessage().subscribe(errorMessage=>{
      if(errorMessage){
        this.errorMessage = errorMessage; 
      }
    });
  }

  signIn(){
    this.authService.userLogin(this.SignInForm.value.email,this.SignInForm.value.password);
  }
  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

}
