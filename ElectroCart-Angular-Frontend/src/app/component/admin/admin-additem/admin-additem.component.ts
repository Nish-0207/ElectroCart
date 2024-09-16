import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectroCartService } from 'src/app/electronicstore.service';
import { Product } from '../../model/product.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-admin-additem',
  templateUrl: './admin-additem.component.html',
  styleUrls: ['./admin-additem.component.css'],
})
export class AdminAdditemComponent {
  productname: string = '';
  image: string = '';
  description: string = '';
  mrpPrice: number = 0;
  quantity: number = 0;
  isEdit: boolean = false;
  productId: any;
  getCategoryList: any[] = [];
  category: number = 0;
  brand: string = '';

  constructor(
    private eservice: ElectroCartService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) {
    this.activateRouter.queryParams.subscribe((params: any) => {
      if (params?.id) {
        this.isEdit = true;
        this.eservice
          .getProductById(params?.id)
          .pipe(take(1))
          .subscribe((res: any) => {
            if (!!res && res?.productId) {
              const product: Product = res;
              console.log('>>>>', product);
              this.productname = product?.productname;
              this.description = product?.description;
              this.image = product?.image;
              this.mrpPrice = product?.mrpPrice;
              this.quantity = product?.quantity;
              this.productId = product?.productId;
              const categoryName = this.getCategoryList.find(
                (cate: any) => cate?.name.toString() === product?.category
              )?.value;
              this.category = categoryName;
              this.brand = product?.brand;
            }
            console.log(res);
          });
      }
    });
  }
  ngOnInit(): void {
    this.eservice.isAdminLoginPresent();
    this.getCategoryList = this.eservice.getCategoryList();
  }

  onAddProduct(): void {
    if (this.productname === '') {
      alert('Product name is required');
      return;
    }

    if (this.image === '') {
      alert('Image should not be blank');
      return;
    }

    if (this.description === '') {
      alert('description  is required');
      return;
    }

    console.log('******MRP price', this.mrpPrice);
    if (this.mrpPrice === 0 || this.mrpPrice === null) {
      alert('MRP Price should not be zero/blank');
      return;
    }
    if (this.quantity === 0 || this.quantity === null || this.quantity < 0) {
      alert('Quantity should not be zero/blank and negative');
      return;
    }

    if (this.brand === '') {
      alert('Brand name is required');
      return;
    }

    const body: any = {
      productname: this.productname,
      image: this.image,
      description: this.description,
      mrpPrice: this.mrpPrice,
      quantity: this.quantity,
      category: this.category,
      brand: this.brand,
    };
    if (this.isEdit) {
      console.log('=======>', body);
      this.eservice
        .editProduct(body, this.productId)
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            console.log('*****', res);
            if (res && res?.productId) {
              alert('Product updated sucessfully');
              this.router.navigate(['/admin/listproduct']);
            }
          },
          (err) => {
            console.log('Error  ', err);
            alert('Something going wrong!! Please try again');
          }
        );
    } else {
      console.log('=======>', body);
      this.eservice
        .addProduct(body)
        .pipe(take(1))
        .subscribe(
          (res: any) => {
            console.log('*****', res);
            if (res && res?.productId) {
              alert('Product added sucessfully');
              this.router.navigate(['/admin/listproduct']);
            }
          },
          (err) => {
            console.log('Error  ', err);
            alert('Something going wrong!! Please try again');
          }
        );
    }
  }
}
