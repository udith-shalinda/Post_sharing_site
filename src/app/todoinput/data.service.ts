import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { List } from '../list.modle';
import { Subject } from 'rxjs';
import {map} from 'rxjs/operators';
 
@Injectable({providedIn:'root'})
export class DataService{
    private list:List[]=[];
    private newData:List;
    private listUpdated=new Subject<List[]>();

    constructor( private http:HttpClient){}

    getdata(){
         this.http.get<{message:string,List:any}>('http://localhost:3000/home')
         .pipe(map((postdata)=>{
            return postdata.List.map(post=>{
                return {
                    title:post.title,
                    comment:post.comment,
                    id:post._id
                };
            });
         }))
         .subscribe((tranformedList)=>{
             console.log(tranformedList);
             this.list=tranformedList;
             this.listUpdated.next([...this.list]);
         });
       
    }
    getListUpdateListener(){
        return this.listUpdated.asObservable();
    }

    getPostForEdit(id:string){
        return this.http.get<{_id:string,title:string,comment:string}>('http://localhost:3000/home/'+id);

    }

    pushdata(title:string,comment:string){
        this.newData={id:null,title:title,comment:comment};
        this.http.post<{message:string,postId:string}>('http://localhost:3000/home',this.newData)
        .subscribe((responseData)=>{
            this.newData.id=responseData.postId;
            this.list.push(this.newData);
            this.listUpdated.next([...this.list]);
        });
    }
    deleteData(id:string){
        this.http.delete('http://localhost:3000/home/'+ id)
        .subscribe(()=>{
            console.log("Post deleted just now");
           const restoflist = this.list.filter(post=>  post.id !== id);
           this.list = restoflist;
           //pass this copy of the list as observerable;
           this.listUpdated.next([...this.list]);
        });
        
    }

    updatePost(id:string,title:string,comment:string){
        const post :List ={id:id,title:title,comment:comment};
        this.http.put('http://localhost:3000/home/'+id, post)
        .subscribe(response=>{
            console.log("Post updated!!!");
        });
    }
}