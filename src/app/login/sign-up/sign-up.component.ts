import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }
  SignUpForm:FormGroup;

  ngOnInit() {
    this.SignUpForm = new FormGroup({
      'email': new FormControl(),
      'password' : new FormControl()
    });
  }

}
