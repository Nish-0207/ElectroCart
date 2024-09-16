import { Component } from '@angular/core';
import { Product } from '../../model/product.model';
import { ElectroCartService } from 'src/app/electronicstore.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css'],
})
export class ItemlistComponent {
  productList: Array<Product> = [];
  getCategoryList: any[] = [];
  category: any = 100;
  allProductList: Array<Product> = [];
  offset: number = 0;
  pageSize: number = 5; // How many item you want to display in your page.
  totalItem: number = 1;

  constructor(private eservice: ElectroCartService, private router: Router) {
    this.eservice.isAdminLoginPresent();
    this.getProductList(true);
  }

  ngOnInit(): void {
    this.getCategoryList = this.eservice.getCategoryList();
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

  delProduct(product: Product): void {
    this.eservice
      .deleteProduct(product?.productId)
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          alert('Product deleted sucessfully');
          this.getProductList(this.category === 100 || this.category === '100');
        },
        (err) => {
          console.log('Error');
        }
      );
  }

  editProduct(product: Product): void {
    this.router.navigate(['/admin/additem'], {
      queryParams: {
        id: product?.productId,
      },
    });
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
