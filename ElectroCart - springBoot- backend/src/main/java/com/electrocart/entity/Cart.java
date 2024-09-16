package com.electrocart.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "cart_table")
@SequenceGenerator(name = "generator3", sequenceName = "gen3", initialValue = 1500)
public class Cart {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator3")
	@Column(name = "cart_id")
	private long cartId;


	
	@Column(name = "quantity")
	private long quantity;

	@Column(name = "mrp_price", nullable = false)
	private double mrpPrice;


	
	@ManyToOne( cascade=CascadeType.MERGE)
	@JoinColumn(name="product_id")
	//@JsonIgnore
    private Product product;
	
	@ManyToOne( cascade=CascadeType.MERGE)
	@JoinColumn(name="customer_id")
    private Customer customer;
	
	
	
	public Cart() {

	}



	public long getCartId() {
		return cartId;
	}



	public void setCartId(long cartId) {
		this.cartId = cartId;
	}



	public long getQuantity() {
		return quantity;
	}



	public void setQuantity(long quantity) {
		this.quantity = quantity;
	}



	public double getMrpPrice() {
		return mrpPrice;
	}



	public void setMrpPrice(double mrpPrice) {
		this.mrpPrice = mrpPrice;
	}



	public Product getProduct() {
		return product;
	}



	public void setProduct(Product product) {
		this.product = product;
	}



	public Customer getCustomer() {
		return customer;
	}



	public void setCustomer(Customer customer) {
		this.customer = customer;
	}



	@Override
	public String toString() {
		return "Cart [cartId=" + cartId + ", quantity=" + quantity + ", mrpPrice=" + mrpPrice + ", product=" + product
				+ ", customer=" + customer + "]";
	}



	
	


	


}