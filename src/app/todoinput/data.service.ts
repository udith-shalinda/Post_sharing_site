import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { List } from '../list.modle';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
import {  Router } from '@angular/router';
import { ProfileService } from '../profile/profile.service';
 
@Injectable({providedIn:'root'})
export class DataService{
    private list:List[]=[];
    private listUpdated=new Subject<{list:List[],maxPosts:number}>();

    constructor( 
        private http:HttpClient,
        private router:Router,
        private profileservice:ProfileService
        ){}

    getdata(postPerPage:number,currentPage: number){
        const queryParams = `?pageSize=${postPerPage}&page=${currentPage}`;
         this.http.get<{message:string,List:any,maxPost:number}>('http://localhost:3000/home'+queryParams)
         .pipe(map((postdata)=>{
            return {post:postdata.List.map(post=>{
                return {
                    title:post.title,
                    comment:post.comment,
                    id:post._id,
                    imagePath:post.imagePath,
                    creater:post.creater,
                    username:post.username,
                    profileImage:post.profileImage
                };
            }),maxpost:postdata.maxPost};
         }))
         .subscribe((tranformedListData)=>{
             this.list=tranformedListData.post;
             this.listUpdated.next({
                 list:[...this.list],
                 maxPosts:tranformedListData.maxpost
                 });
                 console.log(tranformedListData);
         });
       
    }
    getListUpdateListener(){
        return this.listUpdated.asObservable();
    }

    getPostForEdit(id:string){
        return this.http.get<{_id:string,title:string,comment:string,imagePath:string,creater:string}>('http://localhost:3000/home/'+id);

    }

    pushdata(profileImage:string,username:string,title:string,comment:string, image:File){
        const newData = new FormData();
        newData.append("profileImage",profileImage);
        newData.append("username",username);
        newData.append("title", title);
        newData.append("comment",comment);
        newData.append("image",image,title);

        this.http.post<{message:string,list:List}>('http://localhost:3000/home',newData)
        .subscribe((responseData)=>{
            this.router.navigate(["/"]);
        });
    }
    deleteData(id:string){
        // const data :{id:string,token:string}={id:id,token: to}
        return this.http.delete('http://localhost:3000/home/'+ id); 
    }

    updatePost(profileImage:string,username:string,id:string,title:string,comment:string,image:File| string){
        let post:List | FormData;
        if(typeof image === 'object'){
            post = new FormData();
            post.append("id",id);
            post.append("username",username);
            post.append("profileImage",profileImage);
            post.append("title",title);
            post.append("comment",comment);
            post.append("imagePath",image,title);
            
        }else{ 
            post ={
                id:id,
                username:username,
                profileImage:profileImage,
                title:title,
                comment:comment,
                imagePath:image,
                creater:null
            };
        }
        this.http.put('http://localhost:3000/home/'+id, post)
        .subscribe(response=>{
            console.log("Post updated!!!");
            this.router.navigate(["/"]);
        });
    }
}