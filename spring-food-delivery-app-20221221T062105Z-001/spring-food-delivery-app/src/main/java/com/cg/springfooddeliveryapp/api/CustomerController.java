package com.cg.springfooddeliveryapp.api;
import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cg.springfooddeliveryapp.dto.CustomerDto;
import com.cg.springfooddeliveryapp.dto.LoginDto;
import com.cg.springfooddeliveryapp.dto.OrderData;
import com.cg.springfooddeliveryapp.entity.Customer;
import com.cg.springfooddeliveryapp.entity.CustomerOrder;
import com.cg.springfooddeliveryapp.entity.Item;
import com.cg.springfooddeliveryapp.entity.OrderedItems;
import com.cg.springfooddeliveryapp.entity.Restaurant;
import com.cg.springfooddeliveryapp.repository.CustomerRepository;
import com.cg.springfooddeliveryapp.service.CustomerOrderService;
import com.cg.springfooddeliveryapp.service.CustomerService;
import com.cg.springfooddeliveryapp.service.JwtUserDetailsService;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:3000",methods = {RequestMethod.PUT,RequestMethod.GET,RequestMethod.DELETE,RequestMethod.POST})
public class CustomerController {
	
	
	@Autowired
	private CustomerService service;
	@Autowired
	private CustomerOrderService cos;
	@Autowired
	private JwtUserDetailsService uds;
	
	@PostMapping("/customersignup")
	public Customer addNewCustomer(@RequestBody CustomerDto customerDto) {
		LoginDto l = new LoginDto();
		l.setUsername(customerDto.getUsername());
		l.setPassword(customerDto.getPassword());
		l.setRole("customer");
		uds.save(l);
		Customer c = new Customer();
		c.setAddress(customerDto.getAddress());
		c.setCustName(customerDto.getCustName());
		c.setGender(customerDto.getGender());
		c.setAge(customerDto.getAge());
		c.setEmail(customerDto.getEmail());
		c.setMobNo(customerDto.getMobNo());
		Customer cust=service.addCustomer(c,customerDto.getUsername());
		return cust;
	}
	@GetMapping("/restaurants")
	@PreAuthorize("hasAuthority('customer')")
	public List<Restaurant> findAllRestaurants(){
		return service.findAllRests();
	}
	@GetMapping("/{restId}/List")
	@PreAuthorize("hasAuthority('customer')")
	public List<Item> findAllItems(@PathVariable("restId") int restId){
		return service.findAllItem(restId);
	}
	
	@GetMapping("/{location}")
	@PreAuthorize("hasAuthority('customer')")
	public List<Restaurant> searchRestaurants(@PathVariable("location") String loc)
	{
		return service.searchRestaurantByLocation(loc);
	}
	
	@Autowired
	private CustomerRepository custRepo;
	@PostMapping("/item")
	@PreAuthorize("hasAuthority('customer')")
	public OrderedItems addItemInCart(@RequestBody OrderData orderData,Principal p)
	{
		System.out.println(p.getName());
		int cid = custRepo.findCustId(p.getName());
		orderData.setCustId(cid);
		OrderedItems oi = service.addItemsToOrder(orderData);
		return oi;
	}
	
	@GetMapping("/orderitems")
	@PreAuthorize("hasAuthority('customer')")
	public List<OrderedItems> listAllItemsInCart(Principal p)
	{
		int cid = custRepo.findCustId(p.getName());
		List<OrderedItems> list = cos.findAllInCart(cid);
		return list;
	}
		
	@GetMapping("/order/totalCost")
	@PreAuthorize("hasAuthority('customer')")
	public float findTotalCost(Principal p)
	{
		int cid = custRepo.findCustId(p.getName());
		float price = cos.calculateTotal(cid);
		return price;
	}
	
	@DeleteMapping("/delete/{iid}")
	@PreAuthorize("hasAuthority('customer')")
	public void deleteItem(@PathVariable("iid") int iid) 
	{ 
		 service.deleteItem(iid); 
	}
	 
	@PostMapping("/placeorder/{restId}/{pay}")
	@PreAuthorize("hasAuthority('customer')")
	public CustomerOrder placeOrderNow(@PathVariable("restId") int restId,@PathVariable("pay") String pay,Principal p)
	{
		int cid = custRepo.findCustId(p.getName());
		return cos.placeOrder(restId,pay,cid);
	}
	
	@DeleteMapping("/cancel/{orderId}")
	@PreAuthorize("hasAuthority('customer')")
	public int OrderCancel(@PathVariable("orderId") int orderId)
	{
		return cos.deleteOrder(orderId);
	}
	
	@GetMapping("/Orders/{custId}")
	@PreAuthorize("hasAuthority('customer')")
	public List<CustomerOrder> viewOrdersById(@PathVariable("custId") int custId)
	{
		return cos.viewOrder(custId);
	}
	
	@PutMapping("/update/{id}")
	@PreAuthorize("hasAuthority('customer')")
	public OrderedItems updateItemsInOrderedItem(@RequestBody OrderData o,@PathVariable("id") int id) 
	{
		 OrderedItems oi=service.updateItemsInOrderedItem(o,id);
		 return oi;
	}
	
}