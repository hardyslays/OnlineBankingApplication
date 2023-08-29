package com.batch8group4.onlinebank.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Dictionary;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.batch8group4.onlinebank.dto.AddBeneficiary;
import com.batch8group4.onlinebank.dto.CustomerApplyForm;
import com.batch8group4.onlinebank.model.Beneficiary;
import com.batch8group4.onlinebank.model.Customer;
import com.batch8group4.onlinebank.service.BeneficiaryService;
import com.batch8group4.onlinebank.service.CustomerService;

import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin
@RestController
@RequestMapping("/api/customer")
public class CustomerController {
	@Autowired
	CustomerService customerService;
	
	
	@PostMapping("/apply")
	public ResponseEntity<Object> postCustomerRequest(@Valid @RequestBody CustomerApplyForm customerApplyForm, BindingResult form )
	{
		if (form.hasErrors()) {
			List<String> errors = new ArrayList<>();
			for (ObjectError it : form.getAllErrors()) {
				errors.add(it.getDefaultMessage());
			}
			Map<String, List<String>> response = new HashMap<String, List<String>>();
			response.put("errors",errors);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
		Customer createdCustomer=customerService.createCustomer(customerApplyForm);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdCustomer);
	}


}
