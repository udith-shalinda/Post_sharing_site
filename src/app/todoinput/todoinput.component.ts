import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-todoinput',
  templateUrl: './todoinput.component.html',
  styleUrls: ['./todoinput.component.css']
})
export class TodoinputComponent implements OnInit {
  todolist :FormGroup;

  constructor() { }

  ngOnInit() {
    this.todolist = new FormGroup({
      'title':new FormControl(),
      'comment':new FormControl()
    })
  }

}
