package com.cg.springfooddeliveryapp.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class OrderedItems {
		@Id
		@GeneratedValue
	private int id;
	private int quantity;
	private float price;
	private int restId;
	@ManyToOne
	@JoinColumn(name = "custId")
	@JsonBackReference("")
	private Customer customer;
	@ManyToOne
	@JoinColumn(name = "itemId")
	private Item item;
	@ManyToOne
	@JoinColumn(name = "orderId")
	@JsonBackReference("customerorder")
	private CustomerOrder order;
	
	
	public int getRestId() {
		return restId;
	}
	public void setRestId(int restId) {
		this.restId = restId;
	}
	public int getId() 
	{
		return id;
	}
	public void setId(int id) 
	{
		this.id = id;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	
	 public CustomerOrder getOrder() 
	 { return order; } 
	 
	 public void setOrder(CustomerOrder order) 
	 { this.order = order; }
	 
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public Item getItem() {
		return item;
	}
	public void setItem(Item item) {
		this.item = item;
	}
}