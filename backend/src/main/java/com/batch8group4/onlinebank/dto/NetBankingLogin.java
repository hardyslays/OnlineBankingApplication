package com.batch8group4.onlinebank.dto;

public class NetBankingLogin {
	private String userName;
    private String password;
	public String getUserName() {
		return userName;
	}
	
	public NetBankingLogin() {
		super();
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public NetBankingLogin(String userName, String password) {
		super();
		this.userName = userName;
		this.password = password;
	}
    
    

}
