package com.cg.springfooddeliveryapp.api;
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

import com.cg.springfooddeliveryapp.entity.CustomerOrder;
import com.cg.springfooddeliveryapp.entity.Item;
import com.cg.springfooddeliveryapp.entity.Restaurant;
import com.cg.springfooddeliveryapp.service.RestaurantService;

@RestController
@RequestMapping("/restaurant")
@CrossOrigin(origins = "http://localhost:3000",methods = {RequestMethod.PUT,RequestMethod.GET,RequestMethod.DELETE,RequestMethod.POST})
public class RestaurantController {

	@Autowired
	private RestaurantService service;
	
	@PostMapping
	@PreAuthorize("hasAuthority('admin')")
	public Restaurant addNewRestaurant(@RequestBody Restaurant r) {
		Restaurant rest=service.addRestaurant(r);
		return rest;
	}
	
	@PostMapping("/{restId}/Item")
	@PreAuthorize("hasAuthority('admin')")
	public Item addNewItem(@RequestBody Item i,@PathVariable("restId") int restId)
	{
		Item item = service.addItemsList(i,restId);
		return item;
	}
	
	@PutMapping("/{itemId}/Item")
	@PreAuthorize("hasAuthority('admin')")
	public Item updateItem(@RequestBody Item i,@PathVariable("itemId") int itemId)
	{
		Item item=service.updateItemsList(i, itemId);
		return item;
	}
	
	@GetMapping("/orders/{restId}")
	@PreAuthorize("hasAuthority('admin')")
	public List<CustomerOrder> findAllOrders(@PathVariable("restId") int restId)
	{
		return service.findAllOrders(restId);
	}
	
	@PutMapping("/{restId}/{orderId}/statusUpdate")
	@PreAuthorize("hasAuthority('admin')")
	public CustomerOrder statusUpdate(@PathVariable("restId") int restId,@PathVariable("orderId") int orderId)
	{
		return service.acceptOrder(restId,orderId);
	}
	
	@GetMapping
	@PreAuthorize("hasAuthority('admin')")
	public List<Restaurant> findAllRestaurants(){
		return service.findAllRests();
	}
	
	@GetMapping("/{restId}")
	@PreAuthorize("hasAuthority('admin')")
	public List<Item> findAllItems(@PathVariable("restId") int restId){
		return service.findAllItem(restId);
	}
	
	@GetMapping("/view/{itemId}")
	@PreAuthorize("hasAuthority('admin')")
	public Item searchItemById(@PathVariable("itemId") int itemId){
		return service.searchById(itemId);
	}
	@DeleteMapping("/{itemId}/delete")
	@PreAuthorize("hasAuthority('admin')")
	public void removeItembyId(@PathVariable int itemId)
	{
		service.deleteItem(itemId);
	}
	
}
