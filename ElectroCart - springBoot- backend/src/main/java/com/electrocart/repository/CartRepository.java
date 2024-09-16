package com.electrocart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.electrocart.entity.Cart;
import com.electrocart.entity.Customer;



@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
	
	void deleteCartByCustomer(Customer c);
}