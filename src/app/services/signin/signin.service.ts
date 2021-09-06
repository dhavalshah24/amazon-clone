import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient) { }

  authURL = "http://localhost:3000/api/v1/users/auth";
  auth(data: any) {
    return this.http.post<any>(this.authURL, data);
  }
}
