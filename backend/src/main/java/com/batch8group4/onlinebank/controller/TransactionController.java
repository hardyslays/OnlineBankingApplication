package com.batch8group4.onlinebank.controller;

import com.batch8group4.onlinebank.exception.NoTransactionsException;
import com.batch8group4.onlinebank.model.Transaction;
import com.batch8group4.onlinebank.service.BeneficiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.batch8group4.onlinebank.dto.TransactionDto;
import com.batch8group4.onlinebank.model.Beneficiary;
import com.batch8group4.onlinebank.service.TransactionService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/transaction")
public class TransactionController {
	@Autowired
	private TransactionService transactionService;
	@Autowired
	private BeneficiaryService beneficiaryService;

	@PostMapping("/transfer/{userName}")
	public ResponseEntity<String> fundTransferRequest(@PathVariable String userName, @RequestBody TransactionDto transactionDto) {
	    String message = transactionService.fundTransferService(userName, transactionDto);

	    if (message.contains("Transaction ID")) {
	        return ResponseEntity.ok(message);
	    } else if ( message.equals("No account exists for this account number") || message.equals("Beneficiary not yet added") || message.equals("Enter valid amount") || message.equals("Transfer limit INR 10,000 exceeded")) {
	        return ResponseEntity.badRequest().body(message);
	    } else {
	        // Handle any other scenarios or errors here
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
	    }
	}

	@GetMapping("/{userName}")
	public ResponseEntity<Map<String, List<Transaction>>> getTransactionsForAccount(@PathVariable String userName) {
		Map<String, List<Transaction>> categorizedTransactions = transactionService.getCategorizedTransactions(userName);
		if (categorizedTransactions.isEmpty()) {
			throw new NoTransactionsException("No transactions found");
		} else {
			return ResponseEntity.ok(categorizedTransactions);
		}
	}
	
	@GetMapping("/reference/{id}")
	public ResponseEntity<Object> getTransactionByIdRequest(@PathVariable String id)
	{
		Optional<Transaction> transaction =transactionService.getTransactionById(id);
		
		return new ResponseEntity<>(transaction,HttpStatus.OK);
	}
	
	@PostMapping("/withdraw/{userName}")
	public ResponseEntity<String> withdrawRequest(@PathVariable String userName, @RequestBody Map<String, Long> requestBody) {
	    Long amount = requestBody.get("amount");
	    String message = transactionService.withdrawService(userName, amount);

	    if (message.startsWith("withdraw successful")) {
	        return ResponseEntity.ok(message);
	    } else if (message.equals("Enter valid amount")) {
	        return ResponseEntity.badRequest().body(message);
	    } else {
	      
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
	    }
	}
}
