import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})
export class ProfileService{

    constructor(private http:HttpClient){}

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
}