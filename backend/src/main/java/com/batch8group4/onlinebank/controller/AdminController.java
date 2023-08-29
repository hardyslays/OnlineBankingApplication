package com.batch8group4.onlinebank.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.batch8group4.onlinebank.dto.CustomerAccount;
import com.batch8group4.onlinebank.model.Account;
import com.batch8group4.onlinebank.model.Admin;
import com.batch8group4.onlinebank.model.Customer;
import com.batch8group4.onlinebank.service.AccountService;
import com.batch8group4.onlinebank.service.AdminService;
import com.batch8group4.onlinebank.service.CustomerService;
import com.batch8group4.onlinebank.service.NetBankingDetailsService;

import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin

@RestController
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	AdminService adminService;
	@Autowired
	CustomerService customerService;
	@Autowired
	AccountService accountService;
	@Autowired
	NetBankingDetailsService netBankingDetailsService;
	
	@GetMapping("/all")
	public ResponseEntity<List<Admin>> getAllAdminsResponse() {
	    List<Admin> admins = adminService.getAllAdmins();
	    if (admins.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
	    }
	    return new ResponseEntity<>(admins, HttpStatus.OK);
	}
	@PostMapping("/create")
	public ResponseEntity<Admin> postAdminRequest(@RequestBody Admin admin)
	{
		Admin createdAdmin=adminService.createAdmin(admin);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdAdmin);
	}
	
	@GetMapping("/all/customers")
	public ResponseEntity<Object> getAllCustomersRequest(@RequestHeader HttpHeaders headers)
	{
		String token = headers.getFirst(HttpHeaders.AUTHORIZATION);
		if (token.equals("batch8group4")) {
			List<Customer> allCustomers=customerService.getCustomers();
//			if (allCustomers.isEmpty())
//			{
//				return new ResponseEntity<> ("No customers found",HttpStatus.INTERNAL_SERVER_ERROR);
//			}
			return new ResponseEntity<>(allCustomers,HttpStatus.OK);
		}
		return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/unapproved/customers")     
	public ResponseEntity<Object> getUnapprovedCustomers (@RequestHeader HttpHeaders headers)
	
	{
		String token = headers.getFirst(HttpHeaders.AUTHORIZATION);
		if(!token.equals("batch8group4")) return new ResponseEntity<>(new Object(),HttpStatus.BAD_REQUEST);
		String returnMsg="NO unapproved customers found";
		List<Customer> unapprovedCustomers= customerService.getUnapprovedCustomers();
//		if (unapprovedCustomers.isEmpty())
//		{
//			return new ResponseEntity<>(returnMsg,HttpStatus.OK);
//		}
		return new ResponseEntity<>(unapprovedCustomers,HttpStatus.OK);
	}

	
	@GetMapping("/approved/customers")
	public ResponseEntity<Object> getApprovedCustomersRequest(@RequestHeader HttpHeaders headers)
	
	{
		String token = headers.getFirst(HttpHeaders.AUTHORIZATION);
		if(!token.equals("batch8group4")) return new ResponseEntity<>(new Object(),HttpStatus.BAD_REQUEST);
		List<Customer> approvedCustomers=customerService.getApprovedCustomers();
//		if (approvedCustomers.isEmpty())
//		{
//			return new ResponseEntity<> ("No customers found",HttpStatus.INTERNAL_SERVER_ERROR);
//		}
		return new ResponseEntity<>(approvedCustomers,HttpStatus.OK);
	}
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody Admin admin)
	{
		String returnMessage=adminService.adminLogin(admin);
		if(returnMessage.contains("Invalid"))return new ResponseEntity<> (returnMessage,HttpStatus.INTERNAL_SERVER_ERROR);
		return new ResponseEntity<>(returnMessage,HttpStatus.OK);
	}
	
	@GetMapping("/customer/{id}")
	public ResponseEntity<Object> getCustomerByIdResponse(@PathVariable String id, @RequestHeader HttpHeaders headers)
	{
		String token = headers.getFirst(HttpHeaders.AUTHORIZATION);
		if(!token.equals("batch8group4")) return new ResponseEntity<>(new Object(),HttpStatus.BAD_REQUEST);
		Optional<Customer> customer=customerService.getCustomerById(id);
		if (customer==null) {
			return new ResponseEntity<>("Customer not found",HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
		return new ResponseEntity<>(customer,HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteCustomerRequest(@PathVariable String id, @RequestHeader HttpHeaders headers)
			
			{
				String token = headers.getFirst(HttpHeaders.AUTHORIZATION);
				if(!token.equals("batch8group4")) return new ResponseEntity<>("",HttpStatus.BAD_REQUEST);
	    boolean deletionSuccessful = customerService.deleteCustomerById(id);

	    if (deletionSuccessful) {
	        return new ResponseEntity<>("Customer deleted successfully", HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>("Customer not found", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	@PostMapping("/approve/{customer_id}")
	public ResponseEntity<Object> approveAccountControl(@PathVariable String customer_id,@RequestHeader HttpHeaders headers)
			
			{
//				String token = headers.getFirst(HttpHeaders.AUTHORIZATION);
//				if(!token.equals("batch8group4")) return new ResponseEntity<>(new Object(),HttpStatus.BAD_REQUEST);
		Optional<Customer> customer = customerService.getCustomerById(customer_id);
		if (customer.get().getApprovedBool()==true) {
			return new ResponseEntity<>("Account already approved",HttpStatus.INTERNAL_SERVER_ERROR);
		}
		String res = accountService.approveAccount(customer_id);
		return new ResponseEntity<>(customer,HttpStatus.OK);
	}
//	@GetMapping("/customer/accounts")
//	public ResponseEntity<Object> getAllAccountsResponse ()
//	{
//		List<Account>  accounts=accountService.getAllAccounts();
//		if (accounts.isEmpty())
//		{
//			return new ResponseEntity<>("No accounts found",HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//		return new ResponseEntity<>(accounts,HttpStatus.OK);
//	}
	
//	@GetMapping("customer/{accountNumber}")
//	public ResponseEntity<Object> getAccountByAccountNumberResponse(@PathVariable String accountNumber)
//	{
//		Optional<Account> account= accountService.getAccountByAccountNumber(accountNumber);
//		if (account.isEmpty())
//		{
//			return new ResponseEntity<>("No account found",HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//		return new ResponseEntity<>(account,HttpStatus.OK);
//	}

	

	@GetMapping("/get/accounts")
	public List<CustomerAccount> getAccounts(@RequestHeader HttpHeaders headers)
	
	{
		String token = headers.getFirst(HttpHeaders.AUTHORIZATION);
		if(!token.equals("batch8group4")) return new ArrayList<CustomerAccount>();
		return adminService.getAccountsService();
	}
	

	@GetMapping("/get/account/{accNo}")
	public CustomerAccount getAccount(@PathVariable String accNo, @RequestHeader HttpHeaders headers)
			
			{
				String token = headers.getFirst(HttpHeaders.AUTHORIZATION);
				if(!token.equals("batch8group4")) return new CustomerAccount();
		return adminService.getAccountService(accNo);
	}
	
	@PostMapping("/enable/account/{customerId}")
	public ResponseEntity<String> enableUserByCustomerId(@PathVariable String customerId, @RequestHeader HttpHeaders headers)
	
	{
		String token = headers.getFirst(HttpHeaders.AUTHORIZATION);
		if(!token.equals("batch8group4")) return new ResponseEntity<>("",HttpStatus.BAD_REQUEST);
	    String result = netBankingDetailsService.enableNetBankingUser(customerId);
	    
	    if (result.equals("Account enabled")) {
	        return ResponseEntity.ok(result);
	    } else {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
	    }
	}
	
	@PostMapping("/disable/account/{customerId}")
	public ResponseEntity<String> disableUserByCustomerId(@PathVariable String customerId, @RequestHeader HttpHeaders headers)
	
	{
		String token = headers.getFirst(HttpHeaders.AUTHORIZATION);
		if(!token.equals("batch8group4")) return new ResponseEntity<>("",HttpStatus.BAD_REQUEST);
	    String result = netBankingDetailsService.disableNetBankingUser(customerId);
	    
	    if (result.equals("Account disabled")) {
	        return ResponseEntity.ok(result);
	    } else {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
	    }
	}
	@GetMapping("/check/account/{customerId}")
	public ResponseEntity<Object> checkUserByCustomerId(@PathVariable String customerId, @RequestHeader HttpHeaders headers)
	
	{
		String token = headers.getFirst(HttpHeaders.AUTHORIZATION);
		if(!token.equals("batch8group4")) return new ResponseEntity<>("",HttpStatus.BAD_REQUEST);
		Boolean returnAns=netBankingDetailsService.checkNetBankingUser(customerId);
		if (returnAns==null)
		{
			return new ResponseEntity<>("customer does not exist",HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(returnAns,HttpStatus.OK);
	}
}
