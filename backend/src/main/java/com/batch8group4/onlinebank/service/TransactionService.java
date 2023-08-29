package com.batch8group4.onlinebank.service;

import com.batch8group4.onlinebank.exception.InsufficientFundsException;
import com.batch8group4.onlinebank.repo.BeneficiaryRepo;
import com.batch8group4.onlinebank.repo.NetBankingDetailsRepo;

import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.batch8group4.onlinebank.dto.TransactionDto;
import com.batch8group4.onlinebank.model.Transaction;
import com.batch8group4.onlinebank.repo.AccountRepo;
import com.batch8group4.onlinebank.repo.TransactionRepo;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service

public class TransactionService {
	@Autowired
	private TransactionRepo transactionRepo;
	@Autowired
	private AccountRepo accountRepo;

	@Autowired
	private BeneficiaryRepo beneficiaryRepo;
	@Autowired
	private NetBankingDetailsRepo netBankingDetailsRepo;


	@Transactional
	public String fundTransferService(String userName, TransactionDto transactionDto) {
		String accountNumber=netBankingDetailsRepo.findAccountNumberByUserName(userName);
//		to
		String beneficiaryAccountNumber = transactionDto.getBeneficiaryAccountNumber();
		
		if(accountRepo.getCustomerAccount(beneficiaryAccountNumber) == null) {
        	return "No account exists for this account number";
        }
		else if (beneficiaryAccountNumber == null)
		{
			return "Beneficiary not yet added";
		}
		else
		{
			Long currentBalance= accountRepo.getBalanceByAccountNumber(beneficiaryAccountNumber);  //get beneficiary balance
			Long currentBalance_= accountRepo.getBalanceByAccountNumber(accountNumber);    
			if (transactionDto.getAmount()>currentBalance_)
			{
				throw new InsufficientFundsException("Insufficient Funds: Transaction failed");
			}
			else if (transactionDto.getAmount()<=0)
			{
				return "Enter valid amount";
			}
			else
			{
				if (transactionDto.getAmount()>10000)
				{
					return "Transfer limit INR 10,000 exceeded";
				}
				else {
					Transaction transaction = new Transaction();
					transaction.setBeneficiaryAccount(beneficiaryAccountNumber);
					transaction.setFromAccount(accountNumber);
					transaction.setAmount(transactionDto.getAmount());
					transaction.setMethodOfPayment(transactionDto.getMethodOfPayment());
					SimpleDateFormat dateFormat = new SimpleDateFormat("HHmmssddyyyyMM");
					String id = dateFormat.format(new Date());
					String transactionId = "TID" + id;
					transaction.setReferenceId(transactionId);
					SimpleDateFormat timestamp = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
					String timestampString = timestamp.format(new Date());
					transaction.setTimestamp(timestampString);

					//subtract from the fromAccount


					Long newBalance = currentBalance_ - transactionDto.getAmount();
//					System.out.println("new balance : "+newBalance);
					accountRepo.updateBalance(accountNumber, newBalance);

					//add to the beneficiary account

					Long newBalanceBeneficiary = currentBalance + transactionDto.getAmount();
					accountRepo.updateBalance(beneficiaryAccountNumber, newBalanceBeneficiary);
//					System.out.println("checking balance \n\n\n\n "+accountRepo.getBalanceByAccountNumber(beneficiaryAccountNumber)+"\n"+accountRepo.getBalanceByAccountNumber(accountNumber));
					transactionRepo.save(transaction);
					return "Transaction ID: " + transactionId;
				}
			}
			

		}

	}

	public Map<String, List<Transaction>> getCategorizedTransactions(String userName) {
String accountNumber=netBankingDetailsRepo.findAccountNumberByUserName(userName);
		List<Transaction> debitTransactions = transactionRepo.findByFromAccount(accountNumber);
		List<Transaction> creditTransactions = transactionRepo.findByBeneficiaryAccount(accountNumber);

		Map<String, List<Transaction>> categorizedTransactions = new HashMap<>();
		categorizedTransactions.put("debit", debitTransactions);
		categorizedTransactions.put("credit", creditTransactions);

		return categorizedTransactions;
	}
	
	public Optional<Transaction> getTransactionById(String transId)
	{
		return transactionRepo.findById(transId);
	}
	
	@Transactional

	public String withdrawService(String userName, Long amount) {
		String accountNumber=netBankingDetailsRepo.findAccountNumberByUserName(userName);
		Long currentBalance=accountRepo.getBalanceByAccountNumber(accountNumber);
		
		if (currentBalance<amount)
		{
			throw new InsufficientFundsException("Insufficient Funds: Transaction failed");
		}
		else if (amount<=0)
		{
			return "Enter valid amount";
		}
		else
		{
			Long updateAmount=currentBalance-amount;
			accountRepo.updateBalance(accountNumber, amount);
			return "withdraw successful, new balance: "+updateAmount;
		}
		
	}
}


