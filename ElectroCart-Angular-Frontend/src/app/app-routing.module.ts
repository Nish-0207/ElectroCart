import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { AdminLoginComponent } from './component/admin/admin-login/admin-login.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { CustomerCartComponent } from './component/customer/customer-cart/customer-cart.component';
import { CustomerOrderComponent } from './component/customer/customer-order/customer-order.component';
import { CustomerPaymentComponent } from './component/customer/customer-payment/customer-payment.component';
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';
import { CustomerLoginComponent } from './component/customer/customer-login/customer-login.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { CustomerSignupComponent } from './component/customer/customer-signup/customer-signup.component';
import { CustomerHomeComponent } from './component/customer/customer-home/customer-home.component';
import { AdminAdditemComponent } from './component/admin/admin-additem/admin-additem.component';
import { ItemlistComponent } from './component/admin/itemlist/itemlist.component';
import { AdminOrderListComponent } from './component/admin/admin-order-list/admin-order-list.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { AdminRegisterComponent } from './component/admin/admin-register/admin-register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'customer-login', component: CustomerLoginComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'forgot-password',component:ForgotPasswordComponent},
  { path: 'customer-signup',component:CustomerSignupComponent},
  { path: 'change-password',component:ChangePasswordComponent},
  { path: 'admin-register',component:AdminRegisterComponent},
 {
    path: 'customer', children: [
      { path: 'cart', component: CustomerCartComponent },
      { path: 'order', component: CustomerOrderComponent },
      { path: 'payment/:orderId/:totalPrice', component: CustomerPaymentComponent },
      { path: 'home',component:CustomerHomeComponent}
    ]
  },
  {
    path: 'admin', children: [
      { path: 'home', component: AdminHomeComponent },
      { path: 'additem',component:AdminAdditemComponent},
      { path: 'itemlist',component:ItemlistComponent},
      { path: 'admin-order-list',component:AdminOrderListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
