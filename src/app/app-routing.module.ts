import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
import { AddProductComponent } from './add-product/add-product.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: "signup", component: SignupComponent},
  {path: "signin", component: SigninComponent},
  {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "addCoupon", component: AddCouponComponent, canActivate: [AuthGuard]},
  {path: "addProduct", component: AddProductComponent, canActivate: [AuthGuard]},
  {path: "**", redirectTo: "/home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
