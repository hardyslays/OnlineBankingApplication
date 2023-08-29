package com.batch8group4.onlinebank.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.batch8group4.onlinebank.model.Account;
import com.batch8group4.onlinebank.repo.AccountRepo;
import com.batch8group4.onlinebank.repo.CustomerRepo;
import com.batch8group4.onlinebank.repo.NetBankingDetailsRepo;

@Service
public class AccountService {

	@Autowired
	private AccountRepo accountRepo;
	@Autowired
	private CustomerRepo customerRepo;
	@Autowired
	private NetBankingDetailsRepo netBankingDetailsRepo;
	
	public List<Account> getAllAccounts()
	{
		return accountRepo.findAll();
	}

	public Optional<Account> getAccountByAccountNumber(String accountNumber) {
		// TODO Auto-generated method stub
		
		return accountRepo.findById(accountNumber);
	}
	@Transactional
	public String approveAccount(String customer_id)
	{
		Account account= new Account(); 
		account.setCustomerId(customer_id);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHssmm");
		String dateString = dateFormat.format(new Date());
		account.setAccountNumber(dateString);
		account.setAccountBalance(500l);
		accountRepo.save(account);
		customerRepo.setApprovedBoolById(customer_id);
		return "Account successfully created with account Number " + dateString + "!";
		 
			
		
		
	}
	
	public ResponseEntity<String> getNameByAcountNumber(String accountNumber) {
		Optional<Account> account = accountRepo.findById(accountNumber);
		if(account.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No account found for given account number"+accountNumber);
		}
		else {
			String username = netBankingDetailsRepo.findUserName(accountNumber);
			System.out.println("Username for given: " + username);
			return ResponseEntity.ok(username);
		}
	}
}
