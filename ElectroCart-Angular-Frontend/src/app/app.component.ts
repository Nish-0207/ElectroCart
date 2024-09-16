import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { ElectroCartService } from './electronicstore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-online-electronic-project';
  isLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;

  constructor(private router: Router, private eservice: ElectroCartService) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event: any) => {
        if (this.eservice.getCustomerAuthorization() !== null) {
          setTimeout(() => {
            this.isLoggedIn = true;
            this.isAdminLoggedIn = false;
          }, 100);
        } else {
          if (this.eservice.getAdminAuthorization() !== null) {
            setTimeout(() => {
              this.isAdminLoggedIn = true;
              this.isLoggedIn = false;
            }, 100);
          }
          {
            setTimeout(() => {
              this.isLoggedIn = false;
              this.isAdminLoggedIn = false;
            }, 1);
          }
        }
      });
    //line 20 to 41-->check when routing(url) change it will check authorization
  }
}
