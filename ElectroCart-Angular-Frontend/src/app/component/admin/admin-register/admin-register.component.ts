import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ElectroCartService } from 'src/app/electronicstore.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css'],
})
export class AdminRegisterComponent {
  firstName: string = '';
  lastName: string = '';
  adminEmailId: string = '';
  adminPassword: string = '';
  dob: string = '';
  phone: string = '';
  district: string = '';
  state: string = '';
  zipcode: string = '';
  gender: string = 'male';

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private eservice: ElectroCartService
  ) {}

  ngOnInit(): void {}
  setDOB(ev: any): void {
    const date: any = this.datePipe.transform(ev?.value, 'yyyy-MM-dd');
    this.dob = date;
  }

  adminSignUp(): void {
    if (this.firstName === '' || this.firstName.length < 3) {
      alert('FirstName must contain atleast 3 characters');
      return;
    }

    const firstName = /^[A-Za-z\s]+$/;
    if (!firstName.test(this.firstName)) {
      alert('Name must only contain alphabets');
      return;
    }

    if (this.lastName === '' || this.lastName.length < 3) {
      alert('LastName must contain atleast 3 characters');
      return;
    }

    const lastName = /^[A-Za-z\s]+$/;
    if (!lastName.test(this.lastName)) {
      alert('Name must only contain alphabets');
      return;
    }

    if (this.adminEmailId === '' || this.adminEmailId === undefined) {
      alert('Email address is blank');
      return;
    }

    const re = /\S+@\S+\.\S+/;
    if (!re.test(this.adminEmailId)) {
      alert('Email address not valid');
      return;
    }

    if (this.dob === '' || this.dob === undefined) {
      alert('Date of Birth is required');
      return;
    }
    const today = new Date();
    const dob = new Date(this.dob);
    if (dob > today) {
      alert('Date of Birth cannot be a future date');
      return;
    }

    if (this.phone === '' || this.phone.length < 10 || this.phone.length > 10) {
      alert('Phone must contain atleast 10 characters');
      return;
    }
    const pattern = /^[6789][0-9]{9}$/;
    if (!pattern.test(this.phone)) {
      alert('Invalid mobile number.');
      return;
    }

    if (this.district === '' || this.district.length < 3) {
      alert('district must contain atleast 3 characters');
      return;
    }

    const district = /^[A-Za-z\s]+$/;
    if (!district.test(this.district)) {
      alert('district must only contain alphabets');
      return;
    }

    if (
      this.zipcode === '' ||
      this.zipcode.length < 6 ||
      this.zipcode.length > 6
    ) {
      alert('Zipcode must contain atleast 6 characters');
      return;
    }
    const zipcode = /^[1234567890][0-9]{5}$/;
    if (!zipcode.test(this.zipcode)) {
      alert('Invalid Zipcode.');
      return;
    }

    if (this.state === '' || this.state.length < 3) {
      alert('state must contain atleast 3 characters');
      return;
    }

    const state = /^[A-Za-z\s]+$/;
    if (!state.test(this.state)) {
      alert('state must only contain alphabets');
      return;
    }

    if (this.adminPassword === '' || this.adminPassword === undefined) {
      alert('Password is blank');
      return;
    }

    if (this.adminPassword.length < 8) {
      alert('Password must be atleast 8 characters');
      return;
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(this.adminPassword)) {
      alert(
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
      );
      return;
    }
    //alert("sucess")
    const body: any = {
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dob,
      phoneNumber: this.phone,
      district: this.district,
      state: this.state,
      zipCode: this.zipcode,
      adminEmailId: this.adminEmailId,
      gender: this.gender,
      adminPassword: this.adminPassword,
    };
    console.log('=======>', body);
    this.eservice
      .adminSignUp(body)
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          console.log('*****', res);
          if (res && res?.adminId) {
            alert('Registration sucessful');
            this.router.navigate(['/admin-login']);
          }
        },
        (err) => {
          console.log('Error  ', err);
          if (err && err?.error === 'Oops duplicate Entry of the data !') {
            alert('Email address registered already, please go to login.');
          } else {
            alert('Something going wrong..pls try again');
          }
        }
      );
  }
}
