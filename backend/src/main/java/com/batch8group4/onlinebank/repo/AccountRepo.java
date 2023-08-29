package com.batch8group4.onlinebank.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import com.batch8group4.onlinebank.model.Account;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface AccountRepo extends JpaRepository<Account,String>  {

    @Query(value = "SELECT ACCOUNT_BALANCE FROM ACCOUNT WHERE ACCOUNT_NUMBER=:accountNumber",nativeQuery = true)
    Long getBalanceByAccountNumber(String accountNumber);
    
    @Query(value = "SELECT CUSTOMER_ID FROM ACCOUNT WHERE ACCOUNT_NUMBER=:accountNumber", nativeQuery = true)
    String findCustomerIdByAccountNumber(String accountNumber);

    @Modifying
    @Query(value = "UPDATE ACCOUNT SET ACCOUNT_BALANCE=:newBalance WHERE ACCOUNT_NUMBER=:accountNumber",nativeQuery = true)
    void updateBalance(String accountNumber, Long newBalance);
    
    @Query(value="SELECT ACCOUNT_NUMBER FROM ACCOUNT WHERE CUSTOMER_ID=:customerId", nativeQuery = true)
    String getAccountNumberUsingCustomerId(String customerId);
    
    @Query(value="SELECT * FROM ACCOUNT WHERE Account_number=:accNo", nativeQuery = true)
    Account getCustomerAccount(String accNo);
    
    
}
