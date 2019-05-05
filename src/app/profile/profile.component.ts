import { Component, OnInit } from '@angular/core';
import { ProfileData } from './profile-module';
import { ProfileService } from './profile.service';
import { Subscription } from 'rxjs';
import { DataService } from '../todoinput/data.service';
import { List } from '../list.modle';
import {  ActivatedRoute, ParamMap } from '@angular/router';

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
  private creater:string;

  constructor(
    private profileservice:ProfileService,
    private dataservice:DataService,
    private route:ActivatedRoute
    ) { }

  ngOnInit() {
    this.isLoading = true;

    this.route.paramMap.subscribe((paramMap :ParamMap)=>{
      if(paramMap.has('creater')){
        this.creater=paramMap.get('creater');
        
        this.profileservice.getOtherProfileDetails(this.creater);
        this.profileDetailsSub = this.profileservice.passProfileDetails()
        .subscribe(result=>{
          this.profileDetails = result.profileDetails
        });
        this.dataservice.getSomeOneElseposts(this.creater);
        this.profilePhotoSub = this.dataservice.getprofilepostlist()
        .subscribe(result=>{
          this.profilePostList = result.list;
          this.isLoading = false
        });

      }else{
        this.profileservice.getMyProfileDetails();
        this.profileDetailsSub = this.profileservice.passProfileDetails()
        .subscribe(result=>{
          this.profileDetails = result.profileDetails  
        });

        this.dataservice.getMyposts();
        this.profilePhotoSub = this.dataservice.getprofilepostlist()
        .subscribe(result=>{
          this.profilePostList = result.list;
          this.isLoading = false
        });
      }
    
    
    });
    
     
    
  }


  ngOnDestroy(){
    this.profileDetailsSub.unsubscribe();
    this.profilePhotoSub.unsubscribe();
  }
  

}
