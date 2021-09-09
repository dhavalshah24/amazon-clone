import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getAllCategoriesURL = "http://localhost:3000/api/v1/categories";

  headers = new HttpHeaders({
    "Authorization": "Bearer " + localStorage.getItem("token")
  });
  options = {headers: this.headers};

  getAllCategories() {
    return this.http.get<any>(this.getAllCategoriesURL, this.options);
  }
}
