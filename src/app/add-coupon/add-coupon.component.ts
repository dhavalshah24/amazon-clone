import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {

  constructor(private fb: FormBuilder, private fireAuth: AngularFireAuth, private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  addCouponForm = this.fb.group({
    coupon: [null, [Validators.required]],
    discountRate: [10, [Validators.required]],
    description: [null, [Validators.required]]
  });

  get coupon() {
    return this.addCouponForm.get("coupon");
  }
  get description() {
    return this.addCouponForm.get("description");
  }

  async addCoupon() {
    if(this.coupon?.valid && this.description?.valid) {
      const user = await this.fireAuth.currentUser;
      try {
        const {coupon, discountRate, description} = this.addCouponForm.value;
        console.log(this.addCouponForm.value);
        await this.db.collection("coupons").doc(user?.uid).set({
          coupon,
          discountRate,
          description,
          email: user?.email
        });
        console.log("Coupon added successfully");
        
      } catch (error) {
        console.log(error); 
      }

    } else {
      alert("Details are invalid");
    }
  }
}
