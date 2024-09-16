package com.electrocart.service;

import java.util.List;

import com.electrocart.entity.Admin;
import com.electrocart.entity.Customer;
import com.electrocart.entity.Product;

public interface AdminService {
	Admin saveAdmin(Admin admin);
	Admin loginAdmin(Admin admin);
	
	public List<Product> getAllProducts(long adminId);
	public List<Customer> getAllCustomers(long adminId);
}