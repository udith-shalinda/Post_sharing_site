import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  SignInForm:FormGroup;

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.SignInForm = new FormGroup({
      'email': new FormControl(),
      'password' : new FormControl()
    });
  }

  signIn(){
    this.authService.userLogin(this.SignInForm.value.email,this.SignInForm.value.password);
  }

}
