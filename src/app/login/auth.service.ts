import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-module';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class AuthService{
    private token:string;
    private authStatusListner = new Subject<boolean>();
    private isAuthed = false;

    constructor(private http:HttpClient,private router:Router){}

    getToken(){
        return this.token;
    }
    getAuthStatusListner(){
        return this.authStatusListner.asObservable();
    }
    getIsAuthed(){
        return this.isAuthed;
    }

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
        this.http.post<{ token : string }>("http://localhost:3000/user/login",userdata)
        .subscribe(response=>{
            this.token = response.token;
            if(this.token){
                this.isAuthed = true;
                this.authStatusListner.next(true);
            }
            this.router.navigate(["/"]);
        });
    }
}