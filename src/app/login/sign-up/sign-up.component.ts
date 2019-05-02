import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit,OnDestroy {
  SignUpForm:FormGroup;
  private authStatusSub:Subscription;
  private errorSub:Subscription;
  private errorMessage:string;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.SignUpForm = new FormGroup({
      'email': new FormControl(null,{validators:Validators.required}),
      'password' : new FormControl(null,{validators:Validators.required})
    });
    this.authStatusSub = this.authService.getAuthStatusListner().subscribe(authstatus=>{
        
    });
    this.errorSub = this.authService.getErrorMessage().subscribe(errorMessage=>{
      if(errorMessage){
        this.errorMessage = errorMessage; 
      }
    });
  }
  signup(){
    this.authService.createUser(this.SignUpForm.value.email,this.SignUpForm.value.password);
  }
  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
    this.errorSub.unsubscribe();
  }
}
