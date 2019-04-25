import { Component, OnInit } from '@angular/core';
import { List } from '../list.modle';
import { DataService } from '../todoinput/data.service';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  panelOpenState = false;
  listItem :List[];
  listSub:Subscription;
  
  constructor(private dataservice:DataService) { }

  ngOnInit() {
    this.dataservice.getdata();
    this.listSub = this.dataservice.getListUpdateListener().subscribe((list:List[])=>{
      this.listItem= list;
    });
  }
  ngOnDestroy(){
    this.listSub.unsubscribe();
  }

}
