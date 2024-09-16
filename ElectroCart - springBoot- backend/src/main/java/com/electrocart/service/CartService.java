package com.electrocart.service;

import java.util.List;

import com.electrocart.entity.Cart;
import com.electrocart.entity.Customer;
import com.electrocart.entity.Product;



public interface CartService {

	Cart addCart(Cart cart,long productId,long customerId);
	List<Cart> getAllCarts();
	Cart getCartById(long cartId);
	Cart updateCart(Cart cart, long cartId);
	void deleteCart(long cartId);
	void deleteCartByCustomer(Customer c);
	
	

}