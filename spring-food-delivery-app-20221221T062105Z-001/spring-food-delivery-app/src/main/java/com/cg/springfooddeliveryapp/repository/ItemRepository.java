package com.cg.springfooddeliveryapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.cg.springfooddeliveryapp.entity.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer>{

	@Query(value = "select * from Item where rest_id= :r",nativeQuery = true)
    List<Item> findallItems(@Param("r") int restId);
	
	@Query(value = "select * from Item where item_id= :i",nativeQuery=true)
	Item findItembyId(@Param("i") int itemId);
	
	
}
