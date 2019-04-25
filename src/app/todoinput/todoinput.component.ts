import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from './data.service';


@Component({
  selector: 'app-todoinput',
  templateUrl: './todoinput.component.html',
  styleUrls: ['./todoinput.component.css']
})
export class TodoinputComponent implements OnInit {
  todolist :FormGroup;


  constructor(private dataservice : DataService) { }

  ngOnInit() {
    this.todolist = new FormGroup({
      'title':new FormControl(),
      'comment':new FormControl()
    })
  }
  buttonClicked(){   
    this.dataservice.pushdata(this.todolist.value.title,this.todolist.value.comment);
  }
}
