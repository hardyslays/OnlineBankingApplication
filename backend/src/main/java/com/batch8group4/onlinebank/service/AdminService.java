package com.batch8group4.onlinebank.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.batch8group4.onlinebank.repo.CustomerRepo;
import com.batch8group4.onlinebank.repo.NetBankingDetailsRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.batch8group4.onlinebank.dto.CustomerAccount;
import com.batch8group4.onlinebank.model.Account;
import com.batch8group4.onlinebank.model.Admin;
import com.batch8group4.onlinebank.model.Customer;
import com.batch8group4.onlinebank.repo.AccountRepo;
import com.batch8group4.onlinebank.repo.AdminRepo;
@Service
public class AdminService {
	@Autowired
	AdminRepo adminRepo;
	@Autowired 
	AccountService accountService;
	@Autowired 
	AccountRepo accountRepo;
	@Autowired
	CustomerRepo customerRepo;
	@Autowired
	NetBankingDetailsRepo netRepo;
	

	public List<Admin> getAllAdmins() {
		// TODO Auto-generated method stub
		
		return adminRepo.findAll();
	}
	
	public CustomerAccount getAccountService(String accountNumber) {
		Account acc = accountRepo.getCustomerAccount(accountNumber);
		CustomerAccount res = new CustomerAccount();
		res.setAccountNumber(accountNumber);
		res.setBalance(acc.getAccountBalance());
		res.setCustomerId(acc.getCustomerId());
		res.setNetBankingUserName(netRepo.findUserName(accountNumber));
		return res;
	}
	
	public List<CustomerAccount> getAccountsService(){
		List<Account> accounts = accountRepo.findAll();
		List<CustomerAccount> response = new ArrayList();
		for (Account x :accounts) {
			response.add(this.getAccountService(x.getAccountNumber()));
		}
		return response;
	}
	public Admin createAdmin(Admin admin) {
		// TODO Auto-generated method stub
		return adminRepo.save(admin);
	}

	public String adminLogin(Admin admin) {
		String uName=admin.getUserName();
		String password=admin.getPassword();
		int id=admin.getAdminId();
		String passwordFromRepo=adminRepo.getPassword(uName);
		if (password.equals(passwordFromRepo))
		{
			return "batch8group4";
		}
		else
		{
			return "Invalid Credentials";
		}
		
	}

	public List<Customer> getUnapprovedCustomerService()
	{
		List<Customer> unapprovedCust=customerRepo.getUnapprovedCustomers();
		return unapprovedCust;
	}

	
	

}
