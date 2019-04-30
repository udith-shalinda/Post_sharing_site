import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  SignUpForm:FormGroup;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.SignUpForm = new FormGroup({
      'email': new FormControl(null,{validators:Validators.required}),
      'password' : new FormControl(null,{validators:Validators.required})
    });
  }
  signup(){
    this.authService.createUser(this.SignUpForm.value.email,this.SignUpForm.value.password);
  }
}
