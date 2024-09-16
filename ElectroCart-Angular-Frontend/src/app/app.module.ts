import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './component/home/home.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { CustomerLoginComponent } from './component/customer/customer-login/customer-login.component';
import { AdminLoginComponent } from './component/admin/admin-login/admin-login.component';
import { AdminHeaderComponent } from './component/admin/admin-header/admin-header.component';
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';
import { CustomerCartComponent } from './component/customer/customer-cart/customer-cart.component';
import { CustomerHeaderComponent } from './component/customer/customer-header/customer-header.component';
import { CustomerOrderComponent } from './component/customer/customer-order/customer-order.component';
import { CustomerPaymentComponent } from './component/customer/customer-payment/customer-payment.component';
import { AppHeaderComponent } from './component/app-header/app-header.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { PagingComponent } from './component/paging/paging.component';
import { AdminAdditemComponent } from './component/admin/admin-additem/admin-additem.component';
import { ItemlistComponent } from './component/admin/itemlist/itemlist.component';
import { CustomerHomeComponent } from './component/customer/customer-home/customer-home.component';
import { CustomerSignupComponent } from './component/customer/customer-signup/customer-signup.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { AdminOrderListComponent } from './component/admin/admin-order-list/admin-order-list.component';
import { CustomerOrderHistoryComponent } from './component/customer/customer-order-history/customer-order-history.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminRegisterComponent } from './component/admin/admin-register/admin-register.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    CustomerLoginComponent,
    AdminLoginComponent,
    AdminHeaderComponent,
    AdminHomeComponent,
    CustomerCartComponent,
    CustomerHeaderComponent,
    CustomerOrderComponent,
    CustomerPaymentComponent,
    AppHeaderComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    PagingComponent,
    AdminAdditemComponent,
    ItemlistComponent,
    CustomerHomeComponent,
    CustomerSignupComponent,
    AdminOrderListComponent,
    CustomerOrderHistoryComponent,
    AdminRegisterComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    NgbModule,
    MatMenuModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
