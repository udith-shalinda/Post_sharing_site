import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { mimeType } from '../../todoinput/mime-type.validator';
import { ProfileService } from '../profile.service';
import { AuthService } from 'src/app/login/auth.service';
import {  ActivatedRoute, ParamMap } from '@angular/router';
import { ProfileData } from '../profile-module';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profileupdate',
  templateUrl: './profileupdate.component.html',
  styleUrls: ['./profileupdate.component.css']
})
export class ProfileupdateComponent implements OnInit {
  isLinear = true;
  imagepre:any;
  profilePicAndName: FormGroup;
  AboutGroup: FormGroup;
  mode:string = "Submit";
  creater:string;
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
  

  constructor(
      private profileservice:ProfileService,
      private authservise:AuthService,
      private route:ActivatedRoute
      ) { }

  ngOnInit() {
    this.profilePicAndName = new FormGroup({
      'name': new FormControl(null,{validators:[ Validators.required]}),
      'image':new FormControl(null,{validators:[Validators.required], asyncValidators:[mimeType]})
    });
    this.AboutGroup = new FormGroup({
      'university':new FormControl(null,{validators:[Validators.required]}),
      'address':new FormControl(null,{validators:[Validators.required]}),
      'mobile':new FormControl(null,{validators:[Validators.required]})
    });

    this.route.paramMap.subscribe((paramMap :ParamMap)=>{
      if(paramMap.has('creater')){
        this.mode= 'Edit',
        this.creater=paramMap.get('id');
        this.profileservice.getProfileDetails();
        this.profileDetailsSub = this.profileservice.passProfileDetails()
        .subscribe(result=>{
          this.profileDetails = result.profileDetails
          this.profilePicAndName.setValue({
            'name':this.profileDetails.name,
            'image':this.profileDetails.image});
          this.AboutGroup.setValue({
              'university':this.profileDetails.university,
              'address':this.profileDetails.address,
              'mobile':this.profileDetails.mobile
          });
          this.imagepre = this.profileDetails.image;
        });
          
      
      } else {
        this.mode = "create";
        this.creater = null;
      }
    });
  }

  imagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.profilePicAndName.patchValue({ image: file });
     this.profilePicAndName.get("image").updateValueAndValidity();
    const reader: FileReader = new FileReader();
    reader.onload = (e: ProgressEvent) => {
      const fr: FileReader = <FileReader>e.target;
      this.imagepre = fr.result;
    };
    reader.readAsDataURL(file);
  }

  submitDetails(){
    if(this.mode=="create"){
      this.profileservice.submitUserDetails(
        this.profilePicAndName.value.name,
        this.profilePicAndName.value.image,
        this.AboutGroup.value.address,
        this.AboutGroup.value.mobile,
        this.AboutGroup.value.university
        );
    }else{
      console.log("sfsfsfsf");
      this.profileservice.updateUserDetails(
        this.profileDetails.id,
        this.profilePicAndName.value.name,
        this.profilePicAndName.value.image,
        this.AboutGroup.value.address,
        this.AboutGroup.value.mobile,
        this.AboutGroup.value.university
      );
    }
  }
  ngOnDestroy(){
    this.profileDetailsSub.unsubscribe();
  }
}
