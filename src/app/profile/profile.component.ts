import { Component, OnInit } from '@angular/core';
import { ProfileData } from './profile-module';
import { ProfileService } from './profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private isLoading=false;
  private profileDetailsSub:Subscription;
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
  

  constructor(private profileservice:ProfileService) { }

  ngOnInit() {
    this.isLoading = true;
     this.profileservice.getProfileDetails();
    this.profileDetailsSub = this.profileservice.passProfileDetails()
    .subscribe(result=>{
      this.profileDetails = result.profileDetails
      this.isLoading = false
    });
    console.log(this.profileDetails.image);
  }
  ngOnDestroy(){
    this.profileDetailsSub.unsubscribe();
  }
  

}
