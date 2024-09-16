import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ElectroCartService } from 'src/app/electronicstore.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css'],
})
export class CustomerLoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errormessage: string = '';
  errormessagep: string = '';

  constructor(
    private router: Router,
    private eservice: ElectroCartService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  signIn(): void {
    if (this.email === '' || this.email === undefined) {
      alert('Email address is blank');
      return;
    }

    const re = /\S+@\S+\.\S+/;
    if (!re.test(this.email)) {
      alert('Email address not valid');
      return;
    }
    this.errormessage = '';

    if (this.password === '' || this.password === undefined) {
      alert('Password is blank');
      return;
    }
    this.errormessagep = '';
    const body = {
      emailID: this.email,
      password: this.password,
    };
    console.log('=======>', body);
    this.eservice
      .customerSignIn(body)
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          console.log('*****', res);
          if (res && res?.customerId) {
            // alert("Login sucessful");
            this.eservice.storeCustomerAuthorization(res?.customerId);
            let userName = '';
            if (res?.firstName) {
              userName += res?.firstName;
            }
            if (res?.lastName) {
              userName += ' ' + res?.lastName;
            }
            this.eservice.storeCustomerUserName(userName);
            alert('Login Successful');
            this.router.navigate(['/customer/home']);
          }
        },
        (err) => {
          console.log('Error ', err);
          console.log('>>> ', err);
          if (err?.error && err?.error.startsWith('Customer  not found with')) {
            alert('Customer email/password is invalid');
          } else {
            alert('Something going wrong in login! pls try again');
          }
        }
      );
  }

  routeToNewUser(): void {
    this.router.navigate(['/customer-signup']);
  }

  routeToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
