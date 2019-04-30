import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-module';

@Injectable({providedIn:'root'})
export class AuthService{
    constructor(private http:HttpClient){}

    createUser(email:string,password:string){
        const authdata :AuthData = {
            email:email,
            password:password
        }
        this.http.post("http://localhost:3000/user/signup",authdata)
        .subscribe(response=>{
            console.log(response);
        })
    }
}