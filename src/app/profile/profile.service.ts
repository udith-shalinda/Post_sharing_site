import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileData } from './profile-module';
import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class ProfileService{
    private profileDetails :ProfileData;
    private profileDetailsListner = new Subject<{profileDetails:ProfileData}>();

    constructor(private http:HttpClient){}

    passProfileDetails(){
        return this.profileDetailsListner.asObservable();
    }
    submitUserDetails(name:string,image:File,address:string,mobile:string,university:string){
        const newData = new FormData();
        newData.append("name", name);
        newData.append("address",address);
        newData.append("image",image,name);
        newData.append("mobile",mobile);
        newData.append("university",university);
        
        this.http.post<{message:string}>("http://localhost:3000/profile/save",newData)
        .subscribe(result=>{
            console.log(result.message);
        });
    }
    getProfileDetails(){
        this.http.get<{message:string,result:any}>("http://localhost:3000/profile/getDetails")
        .subscribe(response=>{
             this.profileDetails = {
                name:response.result.name,
                address:response.result.address,
                email:response.result.email,
                mobile:response.result.mobile,
                university:response.result.university,
                creater:response.result.creater,
                image:response.result.imagePath              
            };
            this.profileDetailsListner.next({
                profileDetails:this.profileDetails
            });
            console.log(this.profileDetails.image);
        });
        
    }
}