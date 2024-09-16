import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { ElectroCartService } from 'src/app/electronicstore.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarRef,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css'],
})
export class CustomerHomeComponent implements OnInit {
  logo: string = '../../../assets/Images/Logo.jpg';
  images = [
    '../../../assets/Images/pic3.jpg',
    '../../../assets/Images/tv_image.webp',
    '../../../assets/Images/onur-binay-yvcGXgc14rE-unsplash.jpg',
    '../../../assets/Images/michal-kubalczyk-WecngmAT-KY-unsplash.jpg',
  ];

  productList: Array<Product> = [];
  quantity: number = 0;
  customer: any = {};
  getCategoryList: any[] = [];
  category: any = 100;
  allProductList: Array<Product> = [];
  offset: number = 0;
  pageSize: number = 4; // How many item you want to display in your page.
  totalItem: number = 1;

  constructor(
    private eservice: ElectroCartService,
    private router: Router,
    config: NgbCarouselConfig,
    private snakcbar: MatSnackBar
  ) {
    config.interval = 2000;
    config.keyboard = false;
    config.pauseOnHover = false;
    this.eservice.isCustomerLoginPresent();
    this.getProductList(true);
    this.getCustomerDetail();
  }

  ngOnInit(): void {
    this.getCategoryList = this.eservice.getCategoryList();
  }

  getCustomerDetail(): void {
    const cid = this.eservice.getCustomerAuthorization();
    this.eservice
      .getCustomerById(cid)
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          console.log('Customer***', res);
          if (!!res && res?.customerId) {
            this.customer = res;
          }
        },
        (err) => {
          console.log('Err');
        }
      );
  }

  getProductList(isAllProduct: boolean = false): void {
    let product: any = this.eservice.getAllProducts(
      this.offset - 1 < 0 ? 0 : this.offset - 1,
      this.pageSize
    );
    if (!isAllProduct) {
      product = this.eservice.getProductByCategory(
        this.category,
        this.offset - 1 < 0 ? 0 : this.offset - 1,
        this.pageSize
      );
    }
    product.pipe(take(1)).subscribe(
      (res: any) => {
        if (res && res?.product && Array.isArray(res?.product)) {
          this.productList = res?.product;
          this.allProductList = res?.product;
          this.totalItem = res?.totalProduct;
        }
      },
      (err: any) => {
        console.log('Error');
      }
    );
  }

  addToCart(product: Product): void {
    const element: any = document.getElementById(product?.productId.toString());
    let qty: any = element !== null ? element.value : 0;
    if (qty === '') {
      element.value = 0;
      qty = 0;
    }
    if (qty === 0 || qty === '0' || qty < 0) {
      alert('Qunatity must be more than zero');
      return;
    }

    if (qty > product?.quantity) {
      alert('Added quantity should not greater than available quantity');
      return;
    }

    const body: any = {
      quantity: qty,
      mrpPrice: product?.mrpPrice,
      prouct: product,
      customer: this.customer,
    };
    console.log('add to cart', body);
    this.eservice
      .addToCart(body, product?.productId, this.customer?.customerId)
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          console.log(res);
          if (!!res && res?.cartId) {
            alert('Item added sucessfully');
            this.getProductList(true);
          }
        },
        (err) => {
          console.log('Error');
        }
      );
  }

  getProductByCategory(): void {
    this.offset = 0;
    this.totalItem = 1;
    if (this.category === '100') {
      this.getProductList(true);
    } else {
      this.getProductList(false);
    }
  }

  onNextPageClick(pageOffSet: any): void {
    this.offset = pageOffSet;
    this.getProductList(this.category === 100 || this.category === '100');
  }

  onPreviousPageClick(pageOffSet: any): void {
    this.offset -= 1;
    this.getProductList(this.category === 100 || this.category === '100');
  }

  onFirstPageClick(pageOffSet: any): void {
    this.offset = 0;
    this.getProductList(this.category === 100 || this.category === '100');
  }

  onLastPageClick(pageOffSet: any): void {
    const lastPage = Math.ceil(this.totalItem / this.pageSize);
    this.offset = lastPage;
    this.getProductList(this.category === 100 || this.category === '100');
  }
}
