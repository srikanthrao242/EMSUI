import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../Config';

@Injectable({
  providedIn: 'root'
})
export class EmsUtilService {

  private studentProfile = `${config.server.serverURL}/api/student-profile`

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

  loadImage(filePath){

    const formData = new FormData();
    formData.append('image', filePath);

    const params = new HttpParams();

    const options = {
        params,
        reportProgress: true,
    };
    const req = new HttpRequest('POST', `${this.studentProfile}`, formData, options);
    return this.http.request(req);
  }


}
