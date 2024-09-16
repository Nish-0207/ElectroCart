import { Component } from '@angular/core';
import { Order } from '../../model/order.model';
import { ElectroCartService } from 'src/app/electronicstore.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.css'],
})
export class AdminOrderListComponent {
  orderList: Order[] = [];
  tempOrderList: Order[] = [];
  today = new Date();
  constructor(
    private eservice: ElectroCartService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.eservice.isAdminLoginPresent();
  }

  ngOnInit(): void {
    this.getOrderList();
  }
  getOrderList(): void {
    this.eservice
      .getAllorderList()
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          if (!!res && Array.isArray(res)) {
            this.orderList = res;
            this.tempOrderList = res;
          }
        },
        (err) => {
          console.log('Error');
        }
      );
  }
  getDate(d: string | undefined): any {
    let ans: any;
    if (!!d && d !== null) {
      ans = this.datePipe.transform(d, 'shortDate') || null;
    }
    return ans;
  }

  changeDate(ev: any): void {
    const date: string =
      this.datePipe.transform(ev?.value, 'yyyy-MM-dd')?.toString() || '';
    //  console.log(new Date(this.orderList[0].orderedDate).getTime(), '>>>>>>', new Date(date).getTime() );
    this.orderList = this.tempOrderList.filter(
      (item: Order) =>
        new Date(item?.orderedDate).getTime() === new Date(date).getTime()
    );
    // this.appointmentDate = date;
  }
}
