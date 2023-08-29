package com.batch8group4.onlinebank.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="NetBanking")
public class NetBankingDetails {
	public NetBankingDetails(String userName, String accountNumber, String password, Boolean enableBool) {
		super();
		this.userName = userName;
		this.accountNumber = accountNumber;
		this.password = password;
		this.enableBool = enableBool;
	}
	
	public NetBankingDetails()
	{}
	@Id
	private String userName;
	
	@Column(unique=true)
	private String accountNumber;

	private String password;
	private Boolean enableBool;
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Boolean getEnableBool() {
		return enableBool;
	}
	public void setEnableBool(Boolean enableBool) {
		this.enableBool = enableBool;
	}	
}
