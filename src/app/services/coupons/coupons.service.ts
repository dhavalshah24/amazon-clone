import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(private http: HttpClient) { }

  addCouponURL = "http://localhost:3000/api/v1/coupons";

  headers = new HttpHeaders({
    "Authorization": "Bearer " + localStorage.getItem("token")
  });
  options = {headers: this.headers};

  addCoupon(data: any) {
    return this.http.post<any>(this.addCouponURL, data, this.options);
  }

}
