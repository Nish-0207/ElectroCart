package com.electrocart.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.electrocart.entity.Admin;
import com.electrocart.entity.Customer;
import com.electrocart.entity.Product;
import com.electrocart.service.AdminService;
import com.electrocart.service.CustomerService;
import com.electrocart.service.ProductService;



@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/admin")
public class AdminController {
	@Autowired
	private AdminService adminservice;
	
	@Autowired
	private ProductService productService;


	@Autowired
	private CustomerService customerService;
	
	  public AdminController(AdminService adminservice) { 
		super();
	  this.adminservice = adminservice; }
	 
	// admin register
	@PostMapping("/register")
	public ResponseEntity<Admin> saveAdmin(@Valid @RequestBody Admin admin) {
		System.out.println("admin register " + admin);
		return new ResponseEntity<Admin>(adminservice.saveAdmin(admin), HttpStatus.CREATED);
	}

	// admin login
	@PostMapping("/login")
	public ResponseEntity<Admin> loginAdmin(@RequestBody Admin admin) {
		return new ResponseEntity<Admin>(adminservice.loginAdmin(admin), HttpStatus.OK);

	}
	

	}