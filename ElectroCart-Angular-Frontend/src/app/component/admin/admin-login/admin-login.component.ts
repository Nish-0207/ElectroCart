import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ElectroCartService } from 'src/app/electronicstore.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errormessage: string = '';
  errormessagep: string = '';
  constructor(private router: Router, private eservice: ElectroCartService) {}

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
    //alert("sucess")
    const body = {
      adminEmailId: this.email,
      adminPassword: this.password,
    };

    this.eservice
      .adminSignIn(body)
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          console.log('*****', res);
          if (res && res?.adminId) {
            let userName = '';
            if (res?.firstName) {
              userName += res?.firstName;
            }
            if (res?.lastName) {
              userName += ' ' + res?.lastName;
            }
            this.eservice.storeAdminUserName(userName);
            this.eservice.storeAdminAuthorization(res?.adminId);
            this.router.navigate(['/admin/home']);
          }
        },
        (err) => {
          console.log('Error  ', err);
          alert('Something going wrong in login!!pl try again');
        }
      );
  }
}
