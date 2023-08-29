package com.batch8group4.onlinebank.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.batch8group4.onlinebank.dto.ChangePassword;
import com.batch8group4.onlinebank.dto.ChangeUsername;
import com.batch8group4.onlinebank.model.Beneficiary;
import com.batch8group4.onlinebank.model.NetBankingDetails;
import com.batch8group4.onlinebank.repo.AccountRepo;
import com.batch8group4.onlinebank.repo.BeneficiaryRepo;
import com.batch8group4.onlinebank.repo.NetBankingDetailsRepo;



@Service
public class NetBankingDetailsService implements UserDetailsService {
	
    @Autowired
	private NetBankingDetailsRepo netBankingDetailsRepo;
    
    @Autowired
    private AccountRepo accountRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        NetBankingDetails user = netBankingDetailsRepo.findByUserName(username);
        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), new ArrayList<>());
    }
    
    public String registerForNetBanking(String accountNumber, NetBankingDetails netBankingDetails) {
        netBankingDetails.setAccountNumber(accountNumber);
        netBankingDetails.setEnableBool(true);
        
        if(accountRepo.getCustomerAccount(accountNumber) == null) {
        	return "No account exists for this account number";
        }
        
        if (netBankingDetailsRepo.existsByAccountNumber(accountNumber)) {
            return "This account is already registered for net banking";
        }
        
        netBankingDetailsRepo.save(netBankingDetails);
        return "Account Number " + accountNumber + " is successfully registered for net banking";
    }
    
    public List<NetBankingDetails> getAllNetBankingUsers()
	{
		return netBankingDetailsRepo.findAll();
	}

	
	public Boolean checkNetBankingUser(String customerId) {
		String accountNumber= accountRepo.getAccountNumberUsingCustomerId(customerId);
		return netBankingDetailsRepo.checkAccount(accountNumber);
	}
	
	@Transactional
	public String disableNetBankingUser(String customerId) {
		String accountNumber= accountRepo.getAccountNumberUsingCustomerId(customerId);
		netBankingDetailsRepo.disableAccount(accountNumber);
		
		// TODO Auto-generated method stub
		return "Account disabled";
	}
	
	@Transactional
	public String enableNetBankingUser(String customerId) {
		String accountNumber= accountRepo.getAccountNumberUsingCustomerId(customerId);
		netBankingDetailsRepo.enableAccount(accountNumber);
		
		// TODO Auto-generated method stub
		return "Account enabled";
	}
//	public String login(NetBankingLogin netBankingLogin) {
//		String username=netBankingLogin.getUserName();
//		String password=netBankingLogin.getPassword()	;
//		// TODO Auto-generated method stub
//		return null;
//	}
	
	@Transactional
	public ResponseEntity<String> changeUserName(String username, ChangeUsername changeUsername)
	{
		String usernameNew=changeUsername.getUserName();
		String accountNumber=netBankingDetailsRepo.findAccountNumberByUserName(username);
		netBankingDetailsRepo.changeUsername(usernameNew,accountNumber);
		return ResponseEntity.ok("Username changed successfully");
		
	}

	@Transactional
	public ResponseEntity<String> changePassword(String username, ChangePassword changePassword) {
		String newPassword=changePassword.getPassword();
		String accountNumber=netBankingDetailsRepo.findAccountNumberByUserName(username);
		netBankingDetailsRepo.changePassword(newPassword,accountNumber);
		return ResponseEntity.ok("Password changed successfully");
	}

}
