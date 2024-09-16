import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElectroCartService {
  url: string = 'http://localhost:8080';

  category: any = [
    {
      name: 'SMARTPHONES',
      value: 0,
    },
    {
      name: 'LAPTOPS',
      value: 1,
    },
    {
      name: 'AC',
      value: 2,
    },
    {
      name: 'COOLER',
      value: 3,
    },
    {
      name: 'AIRDOPES',
      value: 4,
    },
    {
      name: 'TELEVISION',
      value: 5,
    },
  ];

  constructor(private http: HttpClient, private router: Router) {}
  /* Client Registeration */
  signUp(body: any): Observable<any> {
    return this.http.post(this.url + '/api/customers/register', body);
  }
  //client login
  customerSignIn(body: any): Observable<any> {
    return this.http.post(this.url + '/api/customers/login', body);
  }
  //once we logged in that time we are storing client id into token
  storeCustomerAuthorization(token: string): void {
    localStorage.setItem('token', token);
  }

  getCustomerAuthorization(): any {
    const token = localStorage.getItem('token');
    return token;
  }

  storeCustomerUserName(name: string): void {
    localStorage.setItem('userName', name);
  }

  getCustomerName(): any {
    const name = localStorage.getItem('userName');
    return name;
  }

  customerLogout(): void {
    localStorage.clear();
    this.router.navigate(['']);
  }
  //admin login
  adminSignUp(body: any): Observable<any> {
    return this.http.post(this.url + '/api/admin/register', body);
  }

  adminSignIn(body: any): Observable<any> {
    return this.http.post(this.url + '/api/admin/login', body);
  }
  storeAdminAuthorization(token: string): void {
    localStorage.setItem('admin', token);
  }
  getAdminAuthorization(): any {
    const token = localStorage.getItem('admin');
    return token;
  }

  storeAdminUserName(name: string): void {
    localStorage.setItem('adminName', name);
  }

  getAdminName(): any {
    const name = localStorage.getItem('adminName');
    return name;
  }

  adminLogout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  // this is to get username in admin.home.html part via admin.home.ts
  isAdminLoginPresent(): void {
    if (this.getAdminAuthorization() === null) {
      this.router.navigate(['/admin-login']);
    }
  }

  isCustomerLoginPresent(): void {
    if (this.getCustomerAuthorization() === null) {
      this.router.navigate(['/customer-login']);
    }
  }

  addProduct(body: any): Observable<any> {
    return this.http.post(this.url + '/api/products/add products', body);
  }

  getProductlist(): Observable<any> {
    return this.http.get(this.url + '/api/products');
  }

  deleteProduct(id: any): Observable<any> {
    //return this.http.delete(this.url + "/api/products/" +id);
    //secondway
    return this.http.delete(`${this.url}/api/products/${id}`);
  }

  getProductById(id: any): Observable<any> {
    return this.http.get(this.url + '/api/products/products/' + id);
  }

  editProduct(body: any, id: any): Observable<any> {
    return this.http.put(this.url + '/api/products/' + id, body);
  }

  addToCart(body: any, pid: any, cid: any): Observable<any> {
    return this.http.post(this.url + '/api/cart/' + cid + '/' + pid, body);
  }

  getCustomerById(id: any): Observable<any> {
    return this.http.get(this.url + '/api/customers/customer/' + id);
  }

  cartList(): Observable<any> {
    return this.http.get(this.url + '/api/cart/list');
  }
  placeOrder(cid: any, cartid: any, body: any): Observable<any> {
    return this.http.post(this.url + '/api/orders/' + cid + '/' + cartid, body);
  }
  deleteCart(id: any): Observable<any> {
    return this.http.delete(`${this.url}/api/cart/${id}`);
  }

  orderList(id: any): Observable<any> {
    return this.http.get(this.url + '/api/orders/' + id);
  }

  getCategoryList(): any {
    return this.category;
  }
  addPayment(body: any, orderid: any, cid: any): Observable<any> {
    return this.http.post(
      this.url + '/api/payements/' + orderid + '/' + cid,
      body
    );
  }

  addPaymentOfOrder(amount: any): Observable<any> {
    return this.http.get(this.url + '/api/orders/createTransaction/' + amount);
  }

  forgotPassword(body: any): Observable<any> {
    return this.http.post(this.url + '/api/customers/forgotpassword', body);
  }

  updateCustomerInformation(body: any): Observable<any> {
    return this.http.put(
      this.url + '/api/customers/customer/' + body?.customerId,
      body
    );
  }

  changePassword(cid: any, password: any): Observable<any> {
    return this.http.post(
      this.url + '/api/customers/' + cid + '/' + password,
      {}
    );
  }

  getProductByCategory(cid: any, offset: any, limit: any): Observable<any> {
    return this.http.get(
      this.url + '/api/products/' + cid + '/' + offset + '/' + limit
    );
  }

  getAllProducts(offset: any, limit: any): Observable<any> {
    return this.http.get(this.url + '/api/products/' + offset + '/' + limit);
  }

  getAllorderList(): Observable<any> {
    return this.http.get(this.url + '/api/orders/');
  }

  placeOrderItem(cid: any, body: any): Observable<any> {
    return this.http.post(this.url + '/api/orders/addOrder/' + cid + '/', body);
  }
}
