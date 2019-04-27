import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { List } from '../list.modle';
import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class DataService{
    private list:List[]=[];
    private newData:List;
    private listUpdated=new Subject<List[]>();

    constructor( private http:HttpClient){}

    getdata(){
         this.http.get<{message:string,List:List[]}>('http://localhost:3000/home')
         .subscribe((postData)=>{
             console.log(postData.List);
             this.list=postData.List;
             this.listUpdated.next([...this.list]);
         });
        
    }
    getListUpdateListener(){
        return this.listUpdated.asObservable();
    }

    pushdata(title:string,comment:string){
        this.newData={id:null,title:title,comment:comment};
        this.http.post<{message:string}>('http://localhost:3000/home',this.newData)
        .subscribe((responseData)=>{
            console.log(responseData);
            this.list.push(this.newData);
            this.listUpdated.next([...this.list]);
        });
    }
}