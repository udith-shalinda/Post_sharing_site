import { Component, OnInit } from '@angular/core';
import { List } from '../list.modle';
import { DataService } from '../todoinput/data.service';
import {  Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  panelOpenState = false;
  listItem :List[] = [];
  listSub:Subscription;
  isLoading = false;
  totalPosts=10;
  postsPerPage = 2;
  postsSizeOptions = [1,2,5,10];
  currentPage = 1;
  userIsAuthentication :boolean= false;
  private authStatus:Subscription;
  isAuthed = false;
  
  constructor(
    private dataservice:DataService,
    private authservice :AuthService
    ) { }

  ngOnInit() {
    this.dataservice.getdata(this.postsPerPage,this.currentPage);
    this.isLoading = true;
    this.listSub = this.dataservice.getListUpdateListener().subscribe((listData :{list:List[],maxPosts:number})=>{
      this.listItem= listData.list;
      this.totalPosts = listData.maxPosts;
      this.isLoading = false;
    });
    this.isAuthed = this.authservice.getIsAuthed();
    
    this.authStatus = this.authservice.getAuthStatusListner().subscribe(response=>{
      this.userIsAuthentication = response;
    });
  }
  ngOnDestroy(){
    this.listSub.unsubscribe();
    this.authStatus.unsubscribe();
  }
  deletePost(id:string){
    this.dataservice.deleteData(id).subscribe(()=>{
      this.ngOnInit();
    });
  }
  OnChangePage(pageEvent:PageEvent){
    this.isLoading = true;
    this.currentPage = pageEvent.pageIndex+1;
    this.postsPerPage = pageEvent.pageSize;
    this.dataservice.getdata(this.postsPerPage,this.currentPage);
  }

 

}
