package com.batch8group4.onlinebank.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.batch8group4.onlinebank.model.NetBankingDetails;

public interface NetBankingDetailsRepo extends JpaRepository<NetBankingDetails,String>  {
	@Query(value="SELECT ACCOUNT_NUMBER FROM NET_BANKING WHERE USER_NAME=:username",nativeQuery=true)
	String findAccountNumberById(String username);

	@Query(value="SELECT COUNT(ACCOUNT_NUMBER)=1 FROM NET_BANKING WHERE ACCOUNT_NUMBER=:beneficiaryAccountNumber", nativeQuery=true)
	String toAccountExists(String beneficiaryAccountNumber);
	
	NetBankingDetails findByUserName(String username);
	
	boolean existsByAccountNumber(String accountNumber);

	@Query(value="SELECT ACCOUNT_NUMBER FROM NET_BANKING WHERE USER_NAME=:userName",nativeQuery=true)
	String findAccountNumberByUserName(String userName);

	@Query(value="SELECT User_Name FROM NET_BANKING WHERE ACCOUNT_NUMBER=:accNo",nativeQuery=true)
	String findUserName(String accNo);
	
	@Query(value="SELECT ENABLE_BOOL FROM NET_BANKING WHERE ACCOUNT_NUMBER=:accountNumber",nativeQuery=true)
	Boolean checkAccount(String accountNumber);
	
	@Modifying
	@Query(value="UPDATE NET_BANKING SET ENABLE_BOOL=FALSE WHERE ACCOUNT_NUMBER=:accountNumber",nativeQuery=true)
	void disableAccount(String accountNumber);

	@Modifying
	@Query(value="UPDATE NET_BANKING SET ENABLE_BOOL=TRUE WHERE ACCOUNT_NUMBER=:accountNumber",nativeQuery=true)
	void enableAccount(String accountNumber);

	@Modifying
	@Query(value="UPDATE net_banking SET user_name=:usernameNew WHERE ACCOUNT_NUMBER=:accountNumber",nativeQuery=true)
	void changeUsername(String usernameNew, String accountNumber);

	@Modifying
	@Query(value="UPDATE net_banking SET password=:newPassword WHERE ACCOUNT_NUMBER=:accountNumber",nativeQuery=true)
	void changePassword(String newPassword, String accountNumber);
}
