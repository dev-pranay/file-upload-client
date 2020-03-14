import { Injectable } from '@angular/core';
import { UserDetail } from '../classes/user-detail';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserDetailService {

  private baseUrl = "http://localhost:8084/api/";

  constructor(private http: HttpClient) { }

  saveData(userDetail: UserDetail): Observable<any> {
    let url = this.baseUrl + "saveUser";
    return this.http.post(url, userDetail);
  }

  uploadFile(file: File, id: number): Observable<any> {
    let url = this.baseUrl + "uploadImage/" + id;

    const formdata: FormData = new FormData();

    formdata.append('file', file);

    return this.http.post(url, formdata);
  }

}
