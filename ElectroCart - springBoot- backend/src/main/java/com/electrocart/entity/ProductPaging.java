package com.electrocart.entity;

import java.util.List;

public class ProductPaging {

	private List<Product> product;
	private long totalProduct;
	
	public List<Product> getProduct() {
		return product;
	}
	public void setProduct(List<Product> product) {
		this.product = product;
	}
	
	public long getTotalProduct() {
		return totalProduct;
	}
	public void setTotalProduct(long totalProduct) {
		this.totalProduct = totalProduct;
	} 
}
