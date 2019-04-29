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
  todolist: FormGroup;
  private mode = "Create";
  private postId: string;
  imagepre: string | ArrayBuffer;

  constructor(
    private dataservice: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.todolist = new FormGroup({
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
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }
  buttonClicked() {
    if (this.mode === "create") {
      this.dataservice.pushdata(
        this.todolist.value.title,
        this.todolist.value.comment
      );
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
