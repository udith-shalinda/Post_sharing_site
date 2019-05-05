import { Component, OnInit } from '@angular/core';
import { ProfileData } from './profile-module';
import { ProfileService } from './profile.service';
import { Subscription } from 'rxjs';
import { DataService } from '../todoinput/data.service';
import { List } from '../list.modle';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private isLoading=false;
  private profileDetailsSub:Subscription;
  private profilePhotoSub:Subscription;
  private profilePostList:List[];
  private profileDetails:ProfileData={
                id:"",
                name:"",
                address:"",
                email:"",
                mobile:'',
                university:"",
                creater:"" ,
                image:""
  };
  

  constructor(
    private profileservice:ProfileService,
    private dataservice:DataService) { }

  ngOnInit() {
    this.isLoading = true;
     this.profileservice.getProfileDetails();
    this.profileDetailsSub = this.profileservice.passProfileDetails()
    .subscribe(result=>{
      this.profileDetails = result.profileDetails
      
    });
    this.dataservice.getMyposts(this.profileDetails.creater);
    this.profilePhotoSub = this.dataservice.getprofilepostlist()
    .subscribe(result=>{
      this.profilePostList = result.list;
      this.isLoading = false
    });
    
  }


  ngOnDestroy(){
    this.profileDetailsSub.unsubscribe();
    this.profilePhotoSub.unsubscribe();
  }
  

}
