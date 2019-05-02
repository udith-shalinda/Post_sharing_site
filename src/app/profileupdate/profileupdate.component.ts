import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { mimeType } from '../todoinput/mime-type.validator';

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
  

  constructor() { }

  ngOnInit() {
    this.profilePicAndName = new FormGroup({
      'name': new FormControl(null,{validators:[ Validators.required]}),
      'image':new FormControl(null,{validators:[Validators.required], asyncValidators:[mimeType]})
    });
    this.AboutGroup = new FormGroup({
      'email': new FormControl(null,{validators:[Validators.required]}),
      'university':new FormControl(null,{validators:[Validators.required]}),
      'address':new FormControl(null,{validators:[Validators.required]}),
      'mobile':new FormControl(null,{validators:[Validators.required]})
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

  profilePicAndNameSubmit(){
    console.log("loginde");
  }
}
