package com.batch8group4.onlinebank.dto;

public class CustomerAccount {
	private String customerId;
	private String accountNumber;
	private String netBankingUserName;
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public String getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
	public String getNetBankingUserName() {
		return netBankingUserName;
	}
	public void setNetBankingUserName(String netBankingUserName) {
		this.netBankingUserName = netBankingUserName;
	}
	public Long getBalance() {
		return balance;
	}
	public void setBalance(Long balance) {
		this.balance = balance;
	}
	private Long balance;
}
