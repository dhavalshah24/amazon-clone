import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
  }

  async getCurrentUser() {
    try {
      const user = await this.fireAuth.currentUser;
      if(user) {
        console.log(user);
      } else {
        console.log("Please login");
        this.router.navigate(['/signin'])
      }
      // this.fireAuth.onAuthStateChanged(user => {
      //   if(user) {
      //     console.log(user);
      //   } else {
      //     console.log("Please login");
      //     this.router.navigate(['/signin'])
      //   }
      // });
      
    } catch (error) {
      console.log(error);
    }
  }

  logout() {
    try {
      this.fireAuth.signOut().then(() => {
        console.log("Logout successful");
        localStorage.removeItem("token")
        this.router.navigate(['/signin']);
      })
    } catch (error) {
      console.log(error);
      
    }
  }

}
