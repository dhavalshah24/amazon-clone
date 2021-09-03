import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router"

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private fireAuth: AngularFireAuth, private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  signinForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  })

  get email() {
    return this.signinForm.get("email");
  }
  get password() {
    return this.signinForm.get("password");
  }

  getEmailError() {
    if (this.email?.hasError("required")) {
      return "Email is required";
    }
    if (this.email?.hasError("email")) {
      return "Invalid email";
    }
    return "";
  }

  async signin() {
    if (this.email?.valid && this.password?.valid) {
      try {
        const { email, password } = this.signinForm.value;
        const result = await this.fireAuth.signInWithEmailAndPassword(email, password);
        if(result) {
          console.log("Signin with Email-Password successful");
          this.router.navigate(['/home']);
        }
      } catch (error) {
        console.log(error);
      }
    }
    else {
      alert("Details are invalid")
    }
  }

  async signinWithGoogle() {
    try {
      const result = await this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      const email = result.user?.email;
      const snapshot = await this.db.collection("users").ref.where("email", "==", email).get();
      if (!snapshot.empty) {
        console.log("Signin with Google successful");
        this.router.navigate(['/home']);
      } else {
        console.log("User does not exist. Sign up");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
