import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private fireAuth: AngularFireAuth, private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  signupForm = this.fb.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    userType: ["customer", [Validators.required]]
  })

  get email() {
    return this.signupForm.get("email");
  }
  get name() {
    return this.signupForm.get("name");
  }
  get password() {
    return this.signupForm.get("password");
  }

  getEmailError() {
    if (this.email?.hasError("required")) {
      return "Email is required";
    }
    if (this.email?.hasError("email")) {
      return "Invalid email";
    }
    return null;
  }

  getPasswordError() {
    if (this.password?.hasError("required")) {
      return "Password is required";
    }
    if (this.password?.hasError("minlength")) {
      return "Password should have at least 6 characters"
    }
    return null;
  }

  async signup() {
    if (this.email?.valid && this.name?.valid && this.password?.valid) {
      try {
        const { email, password, name } = this.signupForm.value;
        const result = await this.fireAuth.createUserWithEmailAndPassword(email, password);
        const username = result.user?.email?.split("@")[0]
        await this.db.collection("users").doc(result?.user?.uid).set({
          username,
          email,
          fullName: name,
          userType: this.signupForm.value.userType
        });
        console.log("Signup with Email-Password successful");
        this.router.navigate(['/home']);

      } catch (error) {
        console.log(error);
      }

    }
    else {
      alert("Details are invalid")
    }
  }

  async signupWithGoogle() {
    // console.log(this.signupForm.value.userType);
    try {

      const result = await this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      const username = result.user?.email?.split("@")[0];
      await this.db.collection("users").doc(result?.user?.uid).set({
        username: username,
        fullName: result?.user?.displayName,
        email: result?.user?.email,
        userType: this.signupForm.value.userType
      });
      console.log("Signup with Google successful");
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);

    }

  }
}
