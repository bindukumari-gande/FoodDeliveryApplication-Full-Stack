package com.cg.springfooddeliveryapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cg.springfooddeliveryapp.entity.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login, Integer>{

	@Query(value = "select l from Login l where username= :u")
	Login findByUsername(@Param("u") String username);

}