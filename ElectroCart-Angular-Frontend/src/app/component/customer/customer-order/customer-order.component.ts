import { Component, OnInit } from '@angular/core';
import { Order } from '../../model/order.model';
import { ElectroCartService } from 'src/app/electronicstore.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CustomerOrderHistoryComponent } from '../customer-order-history/customer-order-history.component';

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css'],
})
export class CustomerOrderComponent implements OnInit {
  orderList: Order[] = [];
  constructor(
    private eservice: ElectroCartService,
    private router: Router,
    private datePipe: DatePipe,
    private dialog: MatDialog
  ) {
    this.eservice.isCustomerLoginPresent();
  }

  ngOnInit(): void {
    this.getOrderList();
  }
  getOrderList(): void {
    this.eservice
      .orderList(this.eservice.getCustomerAuthorization())
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          console.log('************', res);
          if (!!res && Array.isArray(res)) {
            this.orderList = res;
          }
        },
        (err) => {
          console.log('Error');
        }
      );
  }
  getDate(d: string | undefined): any {
    //return  !!d ? this.datePipe.transform(new Date(d),"" )?.toString(): "";
    //return this.datePipe.transform(d,"").toString();
    let ans: any;
    console.log('DDDDDD', d);
    if (!!d && d !== null) {
      ans = this.datePipe.transform(d, 'shortDate') || null;
      console.log('@@@@@@@@', ans);
    }
    return ans;
  }

  addPayment(order: Order): void {
    this.router.navigate([
      `/customer/payment/${order?.orderId}/${order?.totalPrice}`,
    ]);
  }

  openHistory(order: Order): void {
    console.log('>>>>>>>', order);
    const dialogRef = this.dialog.open(CustomerOrderHistoryComponent, {
      data: order,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '80%',
      width: '80%',
    });
  }
}
