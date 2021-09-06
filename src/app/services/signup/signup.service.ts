import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signupURL = "http://localhost:3000/api/v1/users/"
  signup(data: any) {
    return this.http.post<any>(this.signupURL, data)
  }

}
