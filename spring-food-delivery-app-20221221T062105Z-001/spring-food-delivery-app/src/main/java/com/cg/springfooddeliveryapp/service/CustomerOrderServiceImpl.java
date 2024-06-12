package com.cg.springfooddeliveryapp.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.cg.springfooddeliveryapp.entity.Customer;
import com.cg.springfooddeliveryapp.entity.CustomerOrder;
import com.cg.springfooddeliveryapp.entity.Item;
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
public class CustomerOrderServiceImpl implements CustomerOrderService{

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
	
	public List<OrderedItems> findAllInCart(int custId)
	{
		List<OrderedItems> list = orderedItemsRepo.findAllItemsInCart(custId);
		if(list!=null) 
		{
			return list;	
		}
		String msg = "Your Cart is Empty"+custId+"invalid source";
		throw new ApplicationException(msg);
	}
	
	 public float calculateTotal(int custId) 
	  {
		 float price[] = orderedItemsRepo.allPrice(custId);
		 float totalPrice = 0;
		 for(int i=0;i<price.length;i++)
		 {
			 totalPrice = totalPrice+price[i];
		 }	
		 return totalPrice;
	 }
		  
	 public CustomerOrder placeOrder(int restId,String pay,int custId)
	 {
		 CustomerOrder c = new CustomerOrder();
		 c.setOrderDate(LocalDate.now());
		 c.setOrderTime(LocalTime.now());
		 c.setTotalCost(calculateTotal(custId));
		 c.setPayment(pay);	
		 Customer cus = custRepo.findById(custId).get();
		 c.setCustomer(cus);
		 Restaurant r = restRepo.findById(restId).get();
		 c.setRest(r);
		 List<OrderedItems> list = orderedItemsRepo.findAllItemsInCart(custId); 
		 c.setOrdereditems(list);
		 c = custOrderRepo.save(c);
		 return c;
	 }
	 
	 public List<CustomerOrder> viewOrder(int custId) 
	 {
		 List<CustomerOrder> list = custOrderRepo.viewOrders(custId);
		 if(list!=null)
		 {
			 return list;
		 }
		 throw new ApplicationException("Order Not Found");
	 }
	  
	 @Transactional
	 public int deleteOrder(int orderId) 
	 {
		 if(orderId!=0)
		 {	 
			 return custOrderRepo.cancellation(orderId);
		 }
		 throw new ApplicationException("Order Not Found");
	 }
}