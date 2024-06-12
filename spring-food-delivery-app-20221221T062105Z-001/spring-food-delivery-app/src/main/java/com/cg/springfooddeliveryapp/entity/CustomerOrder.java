package com.cg.springfooddeliveryapp.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
@Entity
public class CustomerOrder {
		@Id
		@GeneratedValue
	private int orderId;
	@JsonFormat(pattern = "dd-MM-yyyy")
	private LocalDate orderDate;
	@JsonFormat(pattern = "hh:mm:ss")
	private LocalTime orderTime;
	@JsonFormat(pattern = "hh:mm:ss")
	private LocalTime deliveryTime;
	private float totalCost;
	private String payment;
	private String status;
	@OneToOne
	@JoinColumn(name = "custId")
	Customer customer;
	@ManyToOne
	@JoinColumn(name = "restId")
	@JsonBackReference("orders")
	Restaurant rest;
	@OneToMany(mappedBy="order")
	@JsonManagedReference("customerorder")
	private List<OrderedItems> ordereditems;
	
	public Restaurant getRest() {
		return rest;
	}
	public void setRest(Restaurant rest) {
		this.rest = rest;
	}
	public int getOrderId() {
		return orderId;
	}
	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}
	public LocalDate getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(LocalDate orderDate) {
		this.orderDate = orderDate;
	}
	public LocalTime getOrderTime() {
		return orderTime;
	}
	public void setOrderTime(LocalTime orderTime) {
		this.orderTime = orderTime;
	}
	public LocalTime getDeliveryTime() {
		return deliveryTime;
	}
	public void setDeliveryTime(LocalTime deliveryTime) {
		this.deliveryTime = deliveryTime;
	}
	public float getTotalCost() {
		return totalCost;
	}
	public void setTotalCost(float totalCost) {
		this.totalCost = totalCost;
	}
	public String getPayment() {
		return payment;
	}
	public void setPayment(String payment) {
		this.payment = payment;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public List<OrderedItems> getOrdereditems() { 
		return ordereditems; 
	} 
	public void setOrdereditems(List<OrderedItems> ordereditems){ 
		this.ordereditems=ordereditems; 
	}
 
}
	
	