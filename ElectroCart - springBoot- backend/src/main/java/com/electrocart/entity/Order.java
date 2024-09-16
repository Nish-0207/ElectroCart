package com.electrocart.entity;

import java.sql.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "order_table")
@SequenceGenerator(name = "generator6", sequenceName = "gen", initialValue = 1000)

public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator6")
	@Column(name = "order_id")
	private long orderId;

	@Column(name = "mrp_price")
	private double mrpPrice;

	@Column(name = "quantity")
	private long quantity;

	@Column(name = "total_price")
	private double totalPrice;

	@Column(name = "order_status")
	private String orderStatus;

	@Column(name = "payment_status")
	private String paymentStatus;

	@Column(name = "ordered_date")
	private Date orderedDate;

	@NotEmpty(message = "Product name is required.")
	@Column(name = "productname", nullable = false, length = 20)
	private String productname;

	@Column(name = "product_image")
	@NotEmpty
	private String image;

	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "customer_id")
//	@JsonIgnore
	private Customer customer;
	
	@ManyToMany(cascade=CascadeType.MERGE)
	@JoinColumn(name="product_id")
    private List<Product> product;

	public Order() {

	}

	public long getOrderId() {
		return orderId;
	}

	public void setOrderId(long orderId) {
		this.orderId = orderId;
	}

	public double getMrpPrice() {
		return mrpPrice;
	}

	public void setMrpPrice(double mrpPrice) {
		this.mrpPrice = mrpPrice;
	}

	public long getQuantity() {
		return quantity;
	}

	public void setQuantity(long quantity) {
		this.quantity = quantity;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public String getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public Date getOrderedDate() {
		return orderedDate;
	}

	public void setOrderedDate(Date orderedDate) {
		this.orderedDate = orderedDate;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public String getProductname() {
		return productname;
	}

	public void setProductname(String productname) {
		this.productname = productname;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	
	public List<Product> getProduct() {
		return product;
	}

	public void setProduct(List<Product> product) {
		this.product = product;
	}

	@Override
//		public String toString() {
//			return "Order [orderId=" + orderId + ", cart=" + cart + ", mrpPrice=" + mrpPrice + ", quantity=" + quantity
//					+ ", totalPrice=" + totalPrice + ", orderStatus=" + orderStatus + ", paymentStatus=" + paymentStatus
//					+ ", orderedDate=" + orderedDate + ", customer=" + customer + "]";
//		}

	public String toString() {
		return "Order [orderId=" + orderId + ", mrpPrice=" + mrpPrice + ", quantity=" + quantity + ", totalPrice="
				+ totalPrice + ", orderStatus=" + orderStatus + ", paymentStatus=" + paymentStatus + ", orderedDate="
				+ orderedDate + ", customer=" + customer + "]";
	}

}