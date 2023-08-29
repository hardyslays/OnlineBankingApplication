package com.batch8group4.onlinebank.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.batch8group4.onlinebank.dto.AddBeneficiary;
import com.batch8group4.onlinebank.dto.ChangePassword;
import com.batch8group4.onlinebank.dto.ChangeUsername;
import com.batch8group4.onlinebank.dto.NetBankingLogin;
import com.batch8group4.onlinebank.dto.NetbankingCustomerDetails;
import com.batch8group4.onlinebank.model.Beneficiary;
import com.batch8group4.onlinebank.model.NetBankingDetails;
import com.batch8group4.onlinebank.repo.AccountRepo;
import com.batch8group4.onlinebank.repo.CustomerRepo;
import com.batch8group4.onlinebank.repo.NetBankingDetailsRepo;
import com.batch8group4.onlinebank.service.BeneficiaryService;
import com.batch8group4.onlinebank.service.NetBankingDetailsService;
import com.batch8group4.onlinebank.utils.JwtUtil;

import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin
@RestController
@RequestMapping("/api/netbanking")
public class NetBankingDetailsController {

	@Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;

	@Autowired
	private NetBankingDetailsService netBankingDetailsService;
	
	@Autowired 
	private BeneficiaryService beneficiaryService;
	
	@Autowired
	private CustomerRepo customerRepo;
	
	@Autowired
	private NetBankingDetailsRepo netBankingDetailsRepo;
	
	@Autowired
	private AccountRepo accountRepo;
	
	@PostMapping("/account/{accountNumber}")
	public ResponseEntity<String> createNetBankingRequest(@PathVariable String accountNumber, @RequestBody NetBankingDetails netBankingDetails) {
	    String msg = netBankingDetailsService.registerForNetBanking(accountNumber, netBankingDetails);

	    if (msg.contains("successfully registered")) {
	        return ResponseEntity.ok(msg);
	    } else {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(msg);
	    }
	}
	
    @GetMapping("/")
    public String welcome() {
        return "This is your net banking profile";
    }

    @PostMapping("/login")
    public String generateToken(@RequestBody NetBankingLogin authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword())
            );
        } catch (Exception ex) {
            return "error";
        }
        return jwtUtil.generateToken(authRequest.getUserName());
    }

    
    
    @GetMapping(value = "/validate")
	public boolean getValidation(@RequestHeader("Authorization") String token){
		token = token.substring(7);
		
		if(jwtUtil.validateToken(token)) {
			
			System.out.println("Token validated");
			return true;
		}
		else {
			System.out.println("Token NOT validated");
			return false;

		}
    }

	
    @GetMapping("/users")
    public ResponseEntity<List<NetBankingDetails>> getNetBankingUsersRequest() {
        List<NetBankingDetails> users = netBankingDetailsService.getAllNetBankingUsers();
        
        if (!users.isEmpty()) {
            return ResponseEntity.ok(users);
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(users);
        }
    }
    @GetMapping("/beneficiary/{userName}")
    public ResponseEntity<List<Beneficiary>> getBeneficiary(@PathVariable String userName) {
        String accountNumber = netBankingDetailsRepo.findAccountNumberById(userName);
        List<Beneficiary> beneficiaries = beneficiaryService.getAllBeneficiary(accountNumber);
        
        return ResponseEntity.ok(beneficiaries);
    }
	
	@PostMapping("/beneficiary/{username}")
	public ResponseEntity<String> addBeneficiaryRequest(
	    @RequestBody AddBeneficiary addBeneficiary,
	    @PathVariable String username
	) {
		
	    ResponseEntity<String> response = beneficiaryService.addBeneficiary(addBeneficiary, username);
	    return response;
	}
	

@GetMapping("/details/{username}")
public ResponseEntity<Object> getNetbankingCustomerDetails(@PathVariable String username) {
    String acNumber = netBankingDetailsRepo.findAccountNumberById(username);
    Long balance = accountRepo.getBalanceByAccountNumber(acNumber);
    String customerId = accountRepo.findCustomerIdByAccountNumber(acNumber);
    
    String title = customerRepo.getTitleByCustomerId(customerId);
    String firstName = customerRepo.getFirstNameByCustomerId(customerId);
    String middleName = customerRepo.getMiddleNameByCustomerId(customerId);
    String lastName = customerRepo.getLastNameByCustomerId(customerId);
    
    NetbankingCustomerDetails details = new NetbankingCustomerDetails();
    details.setAccountNumber(acNumber);
    details.setTitle(title);
    details.setFirstName(firstName);
    details.setMiddleName(middleName);
    details.setLastName(lastName);
    details.setBalance(balance);
    
    if (details.getAccountNumber() != null) {
        return ResponseEntity.ok(details);
    } else {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Not found");
    }
}

@PutMapping("/change/username/{username}")
public ResponseEntity<String> changeUsernameRequest(@PathVariable String username,@RequestBody ChangeUsername changeUsername)
{
	return netBankingDetailsService.changeUserName(username, changeUsername);
}

@PutMapping("/change/password/{username}")
public ResponseEntity<String> changePasswordRequest(@PathVariable String username,@RequestBody ChangePassword changePassword)
{
	return netBankingDetailsService.changePassword(username, changePassword);
}
}


