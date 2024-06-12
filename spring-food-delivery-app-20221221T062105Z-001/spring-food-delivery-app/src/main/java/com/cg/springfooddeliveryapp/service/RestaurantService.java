package com.cg.springfooddeliveryapp.service;

import java.util.List;

import com.cg.springfooddeliveryapp.entity.CustomerOrder;
import com.cg.springfooddeliveryapp.entity.Item;
import com.cg.springfooddeliveryapp.entity.Restaurant;

public interface RestaurantService {

	Restaurant addRestaurant(Restaurant r);
	Item addItemsList(Item i,int restId);
	Item updateItemsList(Item i,int ItemId);
	List<CustomerOrder> findAllOrders(int restId);
	CustomerOrder acceptOrder(int restId,int orderId);
	List<Restaurant> findAllRests();
	List<Item> findAllItem(int restId);
	Item searchById(int itemId);
	void deleteItem(int itemId) ;
}