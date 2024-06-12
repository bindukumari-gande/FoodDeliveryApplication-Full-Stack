package com.cg.springfooddeliveryapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cg.springfooddeliveryapp.entity.CustomerOrder;

@Repository
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Integer>{

	@Query(value = "select * from Customer_Order where rest_id= :r",nativeQuery = true)
	List<CustomerOrder> findOrders(@Param("r") int restId);
	
	@Query(value = "delete from CustomerOrder c where c.orderId= :o")
	@Modifying
	int cancellation(@Param("o") int order_Id);
	
	@Query(value = "select * from Customer_Order where cust_id= :c",nativeQuery = true)
	List<CustomerOrder> viewOrders(@Param("c") int custId);
}