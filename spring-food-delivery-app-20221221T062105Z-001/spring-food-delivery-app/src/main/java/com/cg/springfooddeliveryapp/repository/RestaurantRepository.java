package com.cg.springfooddeliveryapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cg.springfooddeliveryapp.entity.Restaurant;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Integer>{

	@Query(value = "select * from Restaurant where location= :l",nativeQuery = true)
	List<Restaurant> restaurantsAtLoc(@Param("l") String location);
	
}