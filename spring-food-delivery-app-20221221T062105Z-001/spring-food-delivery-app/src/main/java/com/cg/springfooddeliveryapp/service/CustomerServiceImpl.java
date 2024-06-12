package com.cg.springfooddeliveryapp.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cg.springfooddeliveryapp.dto.OrderData;
import com.cg.springfooddeliveryapp.entity.Customer;
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
public class CustomerServiceImpl implements CustomerService{

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
	
	public Customer addCustomer(Customer c, String userName) throws ApplicationException{
		Login l=loginRepo.findByUsername(userName);
		if(c!=null && l!=null)
		{	
			c.setLogin(l);
			Customer cust=custRepo.save(c);
			return cust;
		}
		throw new ApplicationException("Enter valid Details");
	}
	public List<Restaurant> findAllRests()
	{
		List<Restaurant> list = em.createQuery("select r from Restaurant r").getResultList();
		return list;
	}
	
	public OrderedItems addItemsToOrder(OrderData orderData)
	{
		int cid=orderData.getCustId();
		int iid=orderData.getItemId();
		
		Customer c = custRepo.findById(cid).get();
		Item i = itemRepo.findById(iid).get();
		
		OrderedItems oi = new OrderedItems();
		oi.setCustomer(c);
		oi.setItem(i);
		oi.setQuantity(orderData.getQuantity());
		oi.setPrice(orderData.getQuantity()*i.getPrice());
		oi.setRestId(i.getRestaurant().getRestId());
		oi = orderedItemsRepo.save(oi);
		return oi;
	}
	
	public List<Restaurant> searchRestaurantByLocation(String loc) throws ApplicationException
	{
		List<Restaurant> list = restRepo.restaurantsAtLoc(loc);
		if(list!=null)
		{
			return list;
		}
		throw new ApplicationException("No Restaurant found in "+loc);
	}
	public List<Item> findAllItem(int restId){
		List<Item> list = itemRepo.findallItems(restId);
		return list;
	}
	
	@Transactional
	public void deleteItem(int id) {
		OrderedItems i = em.find(OrderedItems.class, id);
		if(i!=null) {
			em.remove(i);
		}
	}
	
	@Transactional
	public OrderedItems updateItemsInOrderedItem(OrderData o,int id) throws ApplicationException {
		OrderedItems oi = orderedItemsRepo.findById(id).get();
		System.out.println(id);
		int iid=o.getItemId();
		System.out.println(iid);
		Item i = itemRepo.findById(iid).get();
		
			oi.setQuantity(o.getQuantity());
			oi.setPrice(o.getQuantity()*i.getPrice());
			oi = orderedItemsRepo.save(oi);
			return oi;
		
	}

}
	