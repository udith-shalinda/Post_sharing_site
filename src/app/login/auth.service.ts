import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-module';
import { Router } from '@angular/router';

@Injectable({providedIn:'root'})
export class AuthService{
    constructor(private http:HttpClient,private router:Router){}

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

    userLogin(email:string,password:string){
        const userdata :AuthData ={
            email:email,
            password:password
        }
        this.http.post("http://localhost:3000/user/login",userdata)
        .subscribe(response=>{
            console.log(response);
            this.router.navigate(["/"]);
        });
    }
}