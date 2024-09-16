import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ElectroCartService } from 'src/app/electronicstore.service';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css'],
})
export class CustomerHeaderComponent implements OnInit {
  url: string = '/customer/home';
  userName: string = '';
  constructor(private eservice: ElectroCartService, private router: Router) {
    if (this.eservice.getCustomerName() !== null) {
      this.userName = this.eservice.getCustomerName();
    }
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event: any) => {
        this.url = event?.url;
      });
  }
  routerToLink(link: string): void {
    if (link === '/customer/logout') {
      this.eservice.customerLogout();
      return;
    }
    this.router.navigate([link]);
  }
}
