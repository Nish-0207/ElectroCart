import { DatePipe } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { take } from 'rxjs';
import { Order } from '../../model/order.model';
import { ElectroCartService } from 'src/app/electronicstore.service';
import { CustomerOrderHistoryComponent } from '../customer-order-history/customer-order-history.component';

declare var Razorpay: any;

@Component({
  selector: 'app-customer-payment',
  templateUrl: './customer-payment.component.html',
  styleUrls: ['./customer-payment.component.css'],
})
export class CustomerPaymentComponent {
  orderList: Order[] = [];
  selectedOrder: Order | undefined;
  customer: any = {};
  constructor(
    private eservice: ElectroCartService,
    private router: Router,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private ngZone: NgZone
  ) {
    this.eservice.isCustomerLoginPresent();
  }

  ngOnInit(): void {
    this.getUserDetail();
    this.getOrderList();
  }

  getUserDetail(): void {
    const cid = this.eservice.getCustomerAuthorization();
    this.eservice
      .getCustomerById(cid)
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          console.log('User*****', res);
          if (!!res && res?.customerId) {
            this.customer = res;
          }
        },
        (err) => {
          console.log('Err');
        }
      );
  }

  getOrderList(): void {
    this.eservice
      .orderList(this.eservice.getCustomerAuthorization())
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          console.log('order*****', res);
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
    let ans: any;
    console.log('DDDDDD', d);
    if (!!d && d !== null) {
      ans = this.datePipe.transform(d, 'shortDate') || null;
      console.log('@@@@@@@@', ans);
    }
    return ans;
  }

  addPayment(order: Order): void {
    this.eservice
      .addPaymentOfOrder(order?.totalPrice)
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          console.log('>>>>12333', res);
          console.log('****');
          if (res && res?.orderId) {
            this.openTransactionModel(res);
            this.selectedOrder = order;
          }
        },
        (error) => {
          console.log('Error => ', error);
        }
      );
  }

  openHistory(order: Order): void {
    console.log('>>>>>>>', order);
    console.log('========');
    let dialogRef = this.dialog.open(CustomerOrderHistoryComponent, {
      data: order,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '80%',
      width: '80%',
    });
  }

  openTransactionModel(response: any) {
    var options = {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: 'ElectroCart',
      description: 'Payment of ElectroCart',
      image:
        'https://cdn.pixabay.com/photo/2023/01/22/13/46/swans-7736415_640.jpg',
      handler: (response: any) => {
        console.log('####', response);
        if (response != null && response.razorpay_payment_id != null) {
          this.processResponse(response);
        } else {
          alert('Payment failed..');
        }
      },
      prefill: {
        name: 'Nishant Patil',
        email: 'Nishantpatil0207@GMAIL.COM',
        contact: '8655408443',
      },
      notes: {
        address: 'ElectroCart',
      },
      theme: {
        color: '#F37254',
      },
    };

    var razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }

  processResponse(resp: any) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>', resp);
    if (
      resp &&
      resp?.razorpay_order_id &&
      resp?.razorpay_payment_id &&
      this.selectedOrder
    ) {
      const body: any = {
        totalPrice: this.selectedOrder?.totalPrice,
        orderId: this.selectedOrder?.orderId,

        PaidDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd')?.toString(),
        paidAmount: this.selectedOrder?.totalPrice,
        customer: this.customer,
      };
      console.log('$$$$$$$', body);
      this.eservice
        .addPayment(
          body,
          this.selectedOrder?.orderId,
          this.customer?.customerId
        )
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            console.log('*********', res);
            if (res && res?.paymentId) {
              alert('Payment done sucessfulyy');
              this.ngZone.run(() => {
                this.getOrderList();
              });
            }
          },
          (err) => {
            console.log('error processresponse');
          }
        );
    }
  }
}
