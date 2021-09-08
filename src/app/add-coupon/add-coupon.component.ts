import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CouponsService } from '../services/coupons/coupons.service';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {

  constructor(private fb: FormBuilder, private couponsService: CouponsService) { }

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
      try {
        const {coupon, discountRate, description} = this.addCouponForm.value;
        const data = {
          code: coupon,
          discount_rate: discountRate,
          description
        };
        this.couponsService.addCoupon(data).subscribe(
          res => console.log(res),
          error => console.log(error)
        );
      } catch (error) {
        console.log(error); 
      }

    } else {
      alert("Details are invalid");
    }
  }
}
