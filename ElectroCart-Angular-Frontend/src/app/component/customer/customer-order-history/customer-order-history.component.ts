import { Component ,Inject } from '@angular/core';
import { Order } from '../../model/order.model';
import { Product } from '../../model/product.model';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-order-history',
  templateUrl: './customer-order-history.component.html',
  styleUrls: ['./customer-order-history.component.css']
})
export class CustomerOrderHistoryComponent {

  order: Order | undefined;
  product: Array<Product> = [];
  constructor(
    //In constructor argument pass component class name i.e OrderHistoryDialogComponent
    public dialogRef: MatDialogRef<CustomerOrderHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    console.log('>>>', data);
    if (!!data && data?.orderId) {
      this.order = data;
      if (this.order?.product && this.order?.product.length > 0) {
        this.product = this.order?.product;
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}


