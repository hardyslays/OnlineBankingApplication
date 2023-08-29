package com.batch8group4.onlinebank.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.batch8group4.onlinebank.model.Beneficiary;


public interface BeneficiaryRepo extends JpaRepository <Beneficiary, Long>{
	List<Beneficiary> findByParentAccount(String parent_account);
	
    @Query(value = "SELECT beneficiary_account_number FROM beneficiary WHERE parent_account=:accountNumber and beneficiary_name=:beneficiaryName",nativeQuery = true)
	String getBeneficiaryAccountNumber(String accountNumber, String beneficiaryName);
    
    boolean existsByBeneficiaryAccountNumberAndParentAccount(String beneficiaryAccountNumber, String parentAccountNumber);
}
