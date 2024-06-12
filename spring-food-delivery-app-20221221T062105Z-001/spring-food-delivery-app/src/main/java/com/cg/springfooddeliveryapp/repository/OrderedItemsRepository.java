package com.cg.springfooddeliveryapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.cg.springfooddeliveryapp.entity.OrderedItems;

@Repository
public interface OrderedItemsRepository extends JpaRepository<OrderedItems, Integer> {

	@Query(value = "select * from Ordered_Items where cust_id= :c",nativeQuery = true)
	List<OrderedItems> findAllItemsInCart(@Param("c") int custId);
	
	@Query(value = "select price from Ordered_Items where cust_id= :c",nativeQuery = true)
	float[] allPrice(@Param("c") int custId);
	
	@Query(value = "select * from Ordered_Items where rest_id= :r",nativeQuery = true)
	List<OrderedItems> findAllItemsInCartByRestId(@Param("r") int restId);
		
	@Query(value = "delete from OrderedItems i where i.id= :iid")
	@Modifying 
	int deleteItem(@Param("iid") int id);
	 
}