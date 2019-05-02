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
    private userId :string;

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
    getUserId(){
        return this.userId;
    }

    createUser(email:string,password:string){
        const authdata :AuthData = {
            email:email,
            password:password
        }
        this.http.post("http://localhost:3000/user/signup",authdata)
        .subscribe(response=>{
            console.log(response);
            if(response){
                this.router.navigate(["/"]);
            }
        })
    }

    userLogin(email:string,password:string){
        const userdata :AuthData ={
            email:email,
            password:password
        }
        this.http.post<{ token : string ,userId:string}>("http://localhost:3000/user/login",userdata)
        .subscribe(response=>{
            
            if(response.token){
                this.token = response.token;
                this.isAuthed = true;
                this.authStatusListner.next(true);
                this.userId = response.userId;
                this.router.navigate(["/"]);
            }
        });
    }

    Logout(){
        this.token = null;
        this.isAuthed = false;
        this.userId = null;
        this.authStatusListner.next(false);
        this.router.navigate(['/signIn']);
    }
}