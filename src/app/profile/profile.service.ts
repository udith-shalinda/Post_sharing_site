import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileData } from './profile-module';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../todoinput/data.service';

@Injectable({providedIn:'root'})
export class ProfileService{
    private profileDetails :ProfileData;
    private profileDetailsListner = new Subject<{profileDetails:ProfileData}>();
    
    constructor(
        private http:HttpClient,
        private router:Router
        ){}

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
        
        this.http.post<{message:string,Result:any}>("http://localhost:3000/profile/save",newData)
        .subscribe(result=>{
            console.log(result.Result);
            this.router.navigate(['/profile']);
        });
    }
    getProfileDetails(){
        this.http.get<{message:string,result:any}>("http://localhost:3000/profile/getDetails")
        .subscribe(response=>{
             this.profileDetails = {
                 id:response.result._id,
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
            
        });
        
    }
    updateUserDetails(id:string,name:string,image:string | File,address:string,mobile:string,university:string){
        let newData:ProfileData | FormData;
        if(typeof image === 'object'){
            newData = new FormData();
            newData.append("id",id);
            newData.append("name", name);
            newData.append("address",address);
            newData.append("image",image,name);
            newData.append("mobile",mobile);
            newData.append("university",university);
            
        }else{ 
            newData ={
                id:id,
                name:name,
                image:image,
                university:university,
                mobile:mobile,
                creater:null,
                address:address,
                email:null
            };
        }
        this.http.put("http://localhost:3000/profile/update",newData)
        .subscribe(result=>{
            this.router.navigate(['/profile']);
        });
    }
    
}