package com.cg.springfooddeliveryapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cg.springfooddeliveryapp.repository.CustomerOrderRepository;
import com.cg.springfooddeliveryapp.repository.CustomerRepository;
import com.cg.springfooddeliveryapp.repository.ItemRepository;
import com.cg.springfooddeliveryapp.repository.LoginRepository;
import com.cg.springfooddeliveryapp.repository.OrderedItemsRepository;
import com.cg.springfooddeliveryapp.repository.RestaurantRepository;

@Component
public class LoginServiceImpl implements LoginService{

	@Autowired
	private CustomerOrderRepository custOrderRepo;
	@Autowired
	private CustomerRepository custRepo;
	@Autowired
	private ItemRepository itemRepo;
	@Autowired
	private LoginRepository loginRepo;
	@Autowired
	private OrderedItemsRepository orderedItemsRepo;
	@Autowired
	private RestaurantRepository restRepo;
	
	
}