
export class DataService{

    list=[{
        title:'test one',
        comment:'this is first test'
    },{
        title:"test two",
        comment:'this is second test'
    }]

    pushdata(title:string,comment:string){
        this.list.push({title,comment});
    }
}