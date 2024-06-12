package com.cg.springfooddeliveryapp.service;

import java.time.Duration;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.cg.springfooddeliveryapp.entity.CustomerOrder;
import com.cg.springfooddeliveryapp.entity.Item;
import com.cg.springfooddeliveryapp.entity.Login;
import com.cg.springfooddeliveryapp.entity.OrderedItems;
import com.cg.springfooddeliveryapp.entity.Restaurant;
import com.cg.springfooddeliveryapp.exceptions.ApplicationException;
import com.cg.springfooddeliveryapp.repository.CustomerOrderRepository;
import com.cg.springfooddeliveryapp.repository.CustomerRepository;
import com.cg.springfooddeliveryapp.repository.ItemRepository;
import com.cg.springfooddeliveryapp.repository.LoginRepository;
import com.cg.springfooddeliveryapp.repository.OrderedItemsRepository;
import com.cg.springfooddeliveryapp.repository.RestaurantRepository;

@Component
public class RestaurantServiceImpl implements RestaurantService{

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
	@PersistenceContext
	private EntityManager em;
	
	public Restaurant addRestaurant(Restaurant r) 
	{
		Restaurant rest=restRepo.save(r);
		return rest;
	}
	public List<Restaurant> findAllRests()
	{
		List<Restaurant> list = em.createQuery("select r from Restaurant r").getResultList();
		return list;
	}
	
	public Item addItemsList(Item i,int restId)
	{
		Restaurant restaurant=  restRepo.findById(restId).get();
		i.setRestaurant(restaurant);
		Item item = itemRepo.save(i);
		return item;
	}
	
	public List<Item> findAllItem(int restId){
		List<Item> list = itemRepo.findallItems(restId);
		return list;
	}
	
	public Item searchById(int itemId) {
		Item i =itemRepo.findItembyId(itemId);
		return i;
	}
	
	@Transactional
	public Item updateItemsList(Item i,int itemId) {
			 
		Item item=em.find(Item.class,itemId);
		if(item !=null)
		{
			item.setItemName(i.getItemName());
			item.setPrice(i.getPrice());
			item.setType(i.getType());
			return item;
		}
		return null;
	}
	
	@Transactional
	public void deleteItem(int itemId) {
		Item i = em.find(Item.class, itemId);
		if(i!=null) {
			em.remove(i);
		}
	}
	
	public List<CustomerOrder> findAllOrders(int restId) 
	{
		List<CustomerOrder> list = custOrderRepo.findOrders(restId);
		if(list==null)
		{
			throw new ApplicationException("No Orders found");
		}
		return list;
	}
	
	public CustomerOrder acceptOrder(int restId,int orderId)
	{
		CustomerOrder order = em.find(CustomerOrder.class,orderId);
		Restaurant r = em.find(Restaurant.class,restId);
		if(order!=null)
		{
			if(order.getOrderTime().isAfter(r.getStartTime())&&order.getOrderTime().isBefore(r.getEndTime()))
			{
				order.setStatus("Order Accepted");
				order.setDeliveryTime(order.getOrderTime().plus(Duration.ofMinutes(30)));
			}
			else 
			{	
				order.setStatus("Order Rejected as restaurant is closed");
			}		
		}
		
		CustomerOrder o = custOrderRepo.save(order);
		return o;
	}
	
}