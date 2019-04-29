import { AbstractControl } from "@angular/forms";
import { Observable, Observer } from "rxjs";
import { ReadVarExpr } from '@angular/compiler';

export const mimeType = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = Observable.create(
    (observer: Observer<{ [key: string]: any }>) => {
<<<<<<< HEAD
      fileReader.addEventListener("loadend", () => {
          const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
=======
      fileReader.addEventListener("loadend", e => {
        const fr: FileReader = <FileReader>e.target;
        const a = fr.result as ArrayBuffer;
        const arr = new Uint8Array(a).subarray(0, 4);
>>>>>>> 4fc8474c011904d2f46938dccfd10a696bd8a542
        let header = "";
        let isValid = false;
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        switch (header) {
          case "89504e47":
            isValid = true;
            break;
          case "ffd8ffe0":
          case "ffd8ffe1":
          case "ffd8ffe2":
          case "ffd8ffe3":
          case "ffd8ffe8":
            isValid = true;
            break;
          default:
            isValid = false; // Or you can use the blob.type as fallback
            break;
        }
        if (isValid) {
          observer.next(null);
        } else {
          observer.next({ invalidMimeType: true });
        }
        observer.complete();
      });
      fileReader.readAsArrayBuffer(file);
    }
  );
  return frObs;
};
