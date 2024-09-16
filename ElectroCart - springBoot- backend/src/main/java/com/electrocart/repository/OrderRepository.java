package com.electrocart.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.electrocart.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

	public List<Order> findByCustomerCustomerId(long customerId);
	//public List<Order> findByCartId(long cartId);
	public void deleteByOrderId(long orderId);
}