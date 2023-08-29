package com.batch8group4.onlinebank.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.batch8group4.onlinebank.dto.AddBeneficiary;
import com.batch8group4.onlinebank.model.Beneficiary;
import com.batch8group4.onlinebank.model.NetBankingDetails;
import com.batch8group4.onlinebank.repo.AccountRepo;
import com.batch8group4.onlinebank.repo.BeneficiaryRepo;
import com.batch8group4.onlinebank.repo.NetBankingDetailsRepo;

@Service
public class BeneficiaryService {
	@Autowired 
	private BeneficiaryRepo beneficiaryRepo;
	@Autowired
	private NetBankingDetailsRepo netBankingDetailsRepo;
	@Autowired 
	private AccountRepo accountRepo;
	
	public List<Beneficiary> getAllBeneficiary(String parent_account)
	{
		return beneficiaryRepo.findByParentAccount(parent_account);
	}
	
	public ResponseEntity<String> addBeneficiary(AddBeneficiary addBeneficiary, String username) {
		System.out.println("done");
	    String fromAccountNumber = netBankingDetailsRepo.findAccountNumberByUserName(username);
		System.out.println("done");
	    String beneficiaryAccountNumber = addBeneficiary.getBeneficiaryAccountNumber();
		System.out.println(beneficiaryAccountNumber);
	    
	    
	    if(accountRepo.findById(beneficiaryAccountNumber).isEmpty()) {

			System.out.println("done");
	    	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	    		.body("No account with given account number exists");
	    }
	    
	    if (fromAccountNumber.equals(beneficiaryAccountNumber)) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	            .body("Cannot add beneficiary with the same account number as the source account");
	    }
	     
	    boolean isDuplicate = beneficiaryRepo.existsByBeneficiaryAccountNumberAndParentAccount(
	        beneficiaryAccountNumber, fromAccountNumber
	    );

	    if (isDuplicate) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	            .body("Beneficiary with the same account number already exists for this source account");
	    }

	    Beneficiary beneficiary = new Beneficiary();
	    beneficiary.setParentAccount(fromAccountNumber);
	    beneficiary.setBeneficiaryName(addBeneficiary.getBeneficiaryName());
	    beneficiary.setBeneficiaryAccountNumber(beneficiaryAccountNumber);
	    beneficiary.setNickName(addBeneficiary.getBeneficiaryNickName());

	    beneficiaryRepo.save(beneficiary);

	    return ResponseEntity.ok("Beneficiary added");
	}




}
