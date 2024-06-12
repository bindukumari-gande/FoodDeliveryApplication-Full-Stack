package com.cg.springfooddeliveryapp.service;

import java.util.List;

import com.cg.springfooddeliveryapp.entity.CustomerOrder;
import com.cg.springfooddeliveryapp.entity.OrderedItems;

public interface CustomerOrderService {
	
	List<OrderedItems> findAllInCart(int custId);
	float calculateTotal(int custId);
	CustomerOrder placeOrder(int restId,String pay,int custId);
	int deleteOrder(int orderId);
	List<CustomerOrder> viewOrder(int custId);
}