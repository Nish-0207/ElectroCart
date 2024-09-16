package com.electrocart.service;

import java.util.List;

import com.electrocart.entity.Order;
import com.electrocart.entity.TransactionDetails;


public interface OrderService {
	Order addOrder(Order order, long customerId, long cartId);

	Order getOrderById(long orderId);

	Order updateOrder(Order order, long orderId);

	List<Order> getOrderByCustomerId(long customerId);

	List<Order> getAllOrders();

	// List<Order> getAllOrdersByCartId(long cartId);
	
	Order addOrderItem(Order order,long customerId);
	
	void deleteOrder(long orderId);

	TransactionDetails createTransaction(Double amount);
}