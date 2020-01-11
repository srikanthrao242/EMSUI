import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmsUtilService {

  constructor(private http: HttpClient) { }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

  createImageFromBlob(obj:any, image: Blob):void {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      obj.imageToShow = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
  }

  getImageFromService(obj:any, imgUrl:string):void {
    obj.isImageLoading = true;
    this.getImage(imgUrl).subscribe(data => {
      this.createImageFromBlob(obj, data);
      obj.isImageLoading = false;
    }, error => {
      obj.isImageLoading = false;
      console.log(error);
    });
  }


}
