import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  panelOpenState = false;
  listItem :{title:string,comment:string}[]
  
  constructor(private dataservice:DataService) { }

  ngOnInit() {
    this.listItem = this.dataservice.list;
  }

}
