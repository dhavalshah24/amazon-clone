import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserTypeGuard implements CanActivate {
  constructor(private router: Router, private fireAuth: AngularFireAuth, private db: AngularFirestore) { }
  data: any[] = [];
  isSeller = false;
  async canActivate() {
    
    const email = localStorage.getItem("email")

    const snapshot = await this.db.collection("users").ref.where("email", "==", email).get();
    snapshot.docs.map((doc: any) => {
      this.data.push(doc.data());
    });
    const userType = this.data[0].userType;
    this.isSeller = userType.includes('seller')
    if(this.isSeller) {
      return true
    }
    this.router.navigate(["/home"]);
    return false;
  }
}
