package com.batch8group4.onlinebank.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.batch8group4.onlinebank.model.Admin;

@Repository
public interface AdminRepo extends JpaRepository<Admin, Integer> {
	
	@Query(value="SELECT PASSWORD FROM ADMIN WHERE USER_NAME=:username",nativeQuery=true)
	String getPassword(String username);
}
