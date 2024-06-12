package com.cg.springfooddeliveryapp.service;

import java.util.List;

import com.cg.springfooddeliveryapp.dto.OrderData;
import com.cg.springfooddeliveryapp.entity.Customer;
import com.cg.springfooddeliveryapp.entity.Item;
import com.cg.springfooddeliveryapp.entity.OrderedItems;
import com.cg.springfooddeliveryapp.entity.Restaurant;

public interface CustomerService {
	Customer addCustomer(Customer c, String userName);
	OrderedItems addItemsToOrder(OrderData orderData);
	void deleteItem(int iid);
	List<Restaurant> searchRestaurantByLocation(String loc);
	OrderedItems updateItemsInOrderedItem(OrderData o,int id);
	List<Restaurant> findAllRests();
	List<Item> findAllItem(int restId);
}