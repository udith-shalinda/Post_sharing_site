import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DataService } from "./data.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { List } from "../list.modle";
import { mimeType } from "./mime-type.validator";

interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}

@Component({
  selector: "app-todoinput",
  templateUrl: "./todoinput.component.html",
  styleUrls: ["./todoinput.component.css"]
})
export class TodoinputComponent implements OnInit {
<<<<<<< HEAD
  todolist :FormGroup;
  private mode = 'Create';
  private postId:string;
  imagepre:any ;

=======
  todolist: FormGroup;
  private mode = "Create";
  private postId: string;
  imagepre: string | ArrayBuffer;
>>>>>>> 4fc8474c011904d2f46938dccfd10a696bd8a542

  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.todolist = new FormGroup({
<<<<<<< HEAD
      'title':new FormControl(null),
      'comment':new FormControl(),
      'image':new FormControl(null,{validators:[Validators.required], asyncValidators:[mimeType]})
    })
    this.route.paramMap.subscribe((paramMap :ParamMap)=>{
      if(paramMap.has('id')){
        this.mode= 'Edit',
        this.postId=paramMap.get('id');
        this.dataservice.getPostForEdit(this.postId).subscribe(postdata=>{
          const list :List = {id:postdata._id,title:postdata.title,comment:postdata.comment,imagePath:postdata.imagePath};
          this.todolist.setValue({'title':list.title,'comment':list.comment, 'image':null});
=======
      title: new FormControl(null),
      comment: new FormControl(),
      image: new FormControl()
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        (this.mode = "Edit"), (this.postId = paramMap.get("id"));
        this.dataservice.getPostForEdit(this.postId).subscribe(postdata => {
          const list: List = {
            id: postdata._id,
            title: postdata.title,
            comment: postdata.comment
          };
          this.todolist.setValue({
            title: list.title,
            comment: list.comment,
            image: null
          });
>>>>>>> 4fc8474c011904d2f46938dccfd10a696bd8a542
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }
<<<<<<< HEAD
  buttonClicked(){ 
    if(this.mode === 'create'){
      this.dataservice.pushdata(this.todolist.value.title,this.todolist.value.comment,this.todolist.value.image);
=======
  buttonClicked() {
    if (this.mode === "create") {
      this.dataservice.pushdata(
        this.todolist.value.title,
        this.todolist.value.comment
      );
>>>>>>> 4fc8474c011904d2f46938dccfd10a696bd8a542
      this.todolist.reset();
    } else {
      this.dataservice.updatePost(
        this.postId,
        this.todolist.value.title,
        this.todolist.value.comment
      );
      this.todolist.reset();
    }
  }
  imagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.todolist.patchValue({ image: file });
    this.todolist.get("image").updateValueAndValidity();
    console.log(file);
    console.log(this.todolist);
    const reader: FileReader = new FileReader();
    reader.onload = (e: ProgressEvent) => {
      //  this.imagepre = reader.result;
      const fr: FileReader = <FileReader>e.target;
      console.log(fr.result);
      this.imagepre = fr.result;
    };
    reader.readAsDataURL(file);
  }
}
