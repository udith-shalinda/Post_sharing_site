import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from './data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { List } from '../list.modle';


@Component({
  selector: 'app-todoinput',
  templateUrl: './todoinput.component.html',
  styleUrls: ['./todoinput.component.css']
})
export class TodoinputComponent implements OnInit {
  todolist :FormGroup;
  private mode = 'Create'
  private postId:string


  constructor(private dataservice : DataService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.todolist = new FormGroup({
      'title':new FormControl(null),
      'comment':new FormControl()
    })
    this.route.paramMap.subscribe((paramMap :ParamMap)=>{
      if(paramMap.has('id')){
        this.mode= 'Edit',
        this.postId=paramMap.get('id');
        this.dataservice.getPostForEdit(this.postId).subscribe(postdata=>{
          const list :List = {id:postdata._id,title:postdata.title,comment:postdata.comment};
          this.todolist = new FormGroup({
            'title':new FormControl(list.title),
            'comment':new FormControl(list.comment)
          })
        });
      }else{
        this.mode="create";
        this.postId=null;
        this.todolist = new FormGroup({
          'title':new FormControl(null),
          'comment':new FormControl()
        })
      }
    })
  }
  buttonClicked(){ 
    if(this.mode === 'create'){
      this.dataservice.pushdata(this.todolist.value.title,this.todolist.value.comment);
      this.todolist.reset();
    }else{
      this.dataservice.updatePost(this.postId,this.todolist.value.title,this.todolist.value.comment);
    } 
    
  }
}
