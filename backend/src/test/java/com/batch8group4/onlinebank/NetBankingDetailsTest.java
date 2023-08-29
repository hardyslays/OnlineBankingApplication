package com.batch8group4.onlinebank;


import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import com.batch8group4.onlinebank.dto.AddBeneficiary;
import com.batch8group4.onlinebank.model.Account;
import com.batch8group4.onlinebank.model.Beneficiary;
import com.batch8group4.onlinebank.model.NetBankingDetails;
import com.batch8group4.onlinebank.repo.AccountRepo;
import com.batch8group4.onlinebank.repo.BeneficiaryRepo;
import com.batch8group4.onlinebank.repo.NetBankingDetailsRepo;
import com.batch8group4.onlinebank.repo.TransactionRepo;
import com.batch8group4.onlinebank.service.AccountService;
import com.batch8group4.onlinebank.service.BeneficiaryService;
import com.batch8group4.onlinebank.service.NetBankingDetailsService;
import com.batch8group4.onlinebank.service.TransactionService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class NetBankingDetailsTest {
	
	@Autowired
	private AccountService accountService;

	@Autowired
	private BeneficiaryService beneficiaryService;
	
	@Autowired 
	private NetBankingDetailsService netBankingDetailsService;
	
	@MockBean
	private AccountRepo accountRepo;
	
	@MockBean
	private TransactionRepo transactionRepo;
	
	@MockBean
	private NetBankingDetailsRepo netBankingDetailsRepo;
	
	@MockBean
	private BeneficiaryRepo beneficiaryRepo;
	
	@Test
	public void getAccountsTest()
	{
		
		when(accountRepo.findAll())
		.thenReturn(Stream.of(
				new Account("20230821135337","1234567",1000120l), new Account("20230822142746","2208132143",100l)).collect(Collectors.toList()));
		assertEquals(2,accountService.getAllAccounts().size());
		
	}
	
	@Test
	public void getNetBankingUsersTest()
	{
		when(netBankingDetailsRepo.findAll())
		.thenReturn(Stream.of(
				new NetBankingDetails("Vaishnavi","Vaish@1225","20230821135337",true), new NetBankingDetails("Kush","Kush@2001","2023081234512",true)).collect(Collectors.toList()));
		
		assertEquals(2,netBankingDetailsService.getAllNetBankingUsers().size());
	}
	
	@Test
    public void registerForNetBanking_Success() {
        NetBankingDetails netBankingDetails = new NetBankingDetails("Vaishnavi", "Vaishu@125", "123456789", true);
        
        when(netBankingDetailsRepo.existsByAccountNumber("123456789")).thenReturn(false);
        when(netBankingDetailsRepo.save(netBankingDetails)).thenReturn(netBankingDetails);
        
        String result = netBankingDetailsService.registerForNetBanking("123456789", netBankingDetails);
        
        assertEquals("Account Number 123456789 is successfully registered for net banking", result);
    }
    
    @Test
    public void registerForNetBanking_AlreadyRegistered() {
        NetBankingDetails netBankingDetails = new NetBankingDetails("Vaishnavi", "Vaishu@125", "123456789", true);
        
        when(netBankingDetailsRepo.existsByAccountNumber("123456789")).thenReturn(true);
        
        assertThrows(DataIntegrityViolationException.class, () -> {
            netBankingDetailsService.registerForNetBanking("123456789", netBankingDetails);
        });
    }
    
    @Test
    public void disableNetBankingUser_Success() {
        String customerId = "123";
        String accountNumber = "987654321";
        
        when(accountRepo.getAccountNumberUsingCustomerId(customerId)).thenReturn(accountNumber);
        
        String result = netBankingDetailsService.disableNetBankingUser(customerId);
        
        assertEquals("Account disabled", result);
        verify(netBankingDetailsRepo).disableAccount(accountNumber);
    }
    
    @Test
    public void testAddBeneficiary_Success() {
        AddBeneficiary addBeneficiary = new AddBeneficiary("Name","12345678","nickName1","nickName2");
        addBeneficiary.setBeneficiaryAccountNumber("123412345678");

        when(netBankingDetailsRepo.findAccountNumberByUserName(anyString())).thenReturn("343434343434");
        when(beneficiaryRepo.existsByBeneficiaryAccountNumberAndParentAccount(anyString(), anyString())).thenReturn(false);

        ResponseEntity<String> response = beneficiaryService.addBeneficiary(addBeneficiary, "user123");

        verify(beneficiaryRepo).save(any(Beneficiary.class));
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Beneficiary added", response.getBody());
    }

    @Test
    public void testAddBeneficiary_SameAccountNumber() {
        AddBeneficiary addBeneficiary = new AddBeneficiary("Name", "12345678", "nickName1", "nickName2");
        addBeneficiary.setBeneficiaryAccountNumber("98989898");  
        when(netBankingDetailsRepo.findAccountNumberByUserName(anyString())).thenReturn("98989898");

        ResponseEntity<String> response = beneficiaryService.addBeneficiary(addBeneficiary, "user123");

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Cannot add beneficiary with the same account number as the source account", response.getBody());
    }

    @Test
    public void testAddBeneficiary_Duplicate() {
    	AddBeneficiary addBeneficiary = new AddBeneficiary("Name","12345678","nickName1","nickName2");
        addBeneficiary.setBeneficiaryAccountNumber("123456789");
        when(netBankingDetailsRepo.findAccountNumberByUserName(anyString())).thenReturn("123456712");
        when(beneficiaryRepo.existsByBeneficiaryAccountNumberAndParentAccount(anyString(), anyString())).thenReturn(true);

        ResponseEntity<String> response = beneficiaryService.addBeneficiary(addBeneficiary, "user123");

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Beneficiary with the same account number already exists for this source account", response.getBody());
    }
    
    
}

    
   


	
	
	
	
	


