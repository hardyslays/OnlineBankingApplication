package com.batch8group4.onlinebank.service;

import java.util.List;
import java.util.Optional;
import java.text.ParseException; import java.text.SimpleDateFormat; import java.util.Date;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MatchingStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.batch8group4.onlinebank.dto.CustomerApplyForm;
import com.batch8group4.onlinebank.model.Customer;
import com.batch8group4.onlinebank.repo.CustomerRepo;

@Service
public class CustomerService {

	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private CustomerRepo customerRepo;
	
	public List<Customer> getUnapprovedCustomers()
	{
		return customerRepo.getUnapprovedCustomers();
	}

	public Optional<Customer> getCustomerById(String id) {
		return customerRepo.findById(id);
	}

	public Customer createCustomer(Customer customer) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("ddMMHHmmss");
		String dateString = dateFormat.format(new Date());
		customer.setApprovedBool(false);
		customer.setCustomerId(dateString);
		System.out.println("\n\n\n\n\nget : "+customer.getAdharNumber());
		return customerRepo.save(customer);
	}
	
	public Customer createCustomer(CustomerApplyForm customerApplyForm) {
	
		Customer customer = new Customer();
		customer = mapper.map(customerApplyForm, Customer.class);
		SimpleDateFormat dateFormat = new SimpleDateFormat("ddMMHHmmss");
		String dateString = dateFormat.format(new Date());
		customer.setApprovedBool(false);
		customer.setCustomerId(dateString);
		return customerRepo.save(customer);
	}
	
	public boolean deleteCustomerById(String id) {
	    try {
	        customerRepo.deleteById(id);
	        return true; 
	    } catch (EmptyResultDataAccessException e) {
	        return false; 
	    }
	}


	public List<Customer> getCustomers() {
		// TODO Auto-generated method stub
		return customerRepo.findAll();
	}

	public List<Customer> getApprovedCustomers() {
		// TODO Auto-generated method stub
		return customerRepo.getApprovedCustomers();
	}
	
}
