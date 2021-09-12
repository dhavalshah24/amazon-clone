import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { SignupService } from '../services/signup/signup.service';
import { SigninService } from '../services/signin/signin.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private signinService: SigninService, private signupService: SignupService, private router: Router, private fireAuth: AngularFireAuth, private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  signupForm = this.fb.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    customer: [true, [Validators.required]],
    seller: [false, [Validators.required]],
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
    if (this.email?.valid && this.name?.valid && this.password?.valid && (this.signupForm.value.customer || this.signupForm.value.seller)) {
      var userType = []
      if (this.signupForm.value.customer) userType.push("customer");
      if (this.signupForm.value.seller) userType.push("seller");

      try {
        const { email, password, name } = this.signupForm.value;
        const result = await this.fireAuth.createUserWithEmailAndPassword(email, password);
        const username = result.user?.email?.split("@")[0];
        const data = {
          username: username,
          fullName: name,
          email: result?.user?.email,
          userType,
          id: result.user?.uid
        }
        this.signupService.signup(data).subscribe(
          res => {
            console.log("Signup with Email-Password successful");
            this.router.navigate(['/signin']);
          },
          error => console.log(error)
        );
      } catch (error) {
        console.log(error);
      }

    }
    else {
      alert("Details are invalid")
    }
  }

  async signupWithGoogle() {
    if (this.signupForm.value.customer || this.signupForm.value.seller) {
      try {

        const result = await this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        const email = result.user?.email;
        let response = false;
        await this.signinService.auth({ email }).subscribe(
          res => response = res.success,
          error => console.log(error)
        )
        const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        wait(1000).then(() => {
          if (!response) {
            var userType = []
            if (this.signupForm.value.customer) userType.push("customer");
            if (this.signupForm.value.seller) userType.push("seller");

            const username = result.user?.email?.split("@")[0];
            const data = {
              username: username,
              fullName: result?.user?.displayName,
              email: result?.user?.email,
              userType,
              id: result.user?.uid
            }
            this.signupService.signup(data).subscribe(
              res => {
                console.log("Signup with Google successful");
                this.router.navigate(['/signin']);
              },
              error => console.log(error)
            );
          } else {
            console.log("Email is already in use");

          }
        })

      } catch (error) {
        console.log(error);

      }

    } else {
      alert("Select a user type");
    }
  }
}
