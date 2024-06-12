package com.cg.springfooddeliveryapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.cg.springfooddeliveryapp.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer>{

	@Query(value="select cust_id from customer where cust_name= :uname",nativeQuery=true)
	int findCustId(@Param("uname")String username);
}