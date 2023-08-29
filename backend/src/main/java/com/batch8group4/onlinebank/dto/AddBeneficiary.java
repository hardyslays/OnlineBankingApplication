package com.batch8group4.onlinebank.dto;

public class AddBeneficiary {
	public AddBeneficiary(String beneficiaryName, String beneficiaryAccountNumber, String beneficiaryNickName,
			String nickName) {
		super();
		this.beneficiaryName = beneficiaryName;
		this.beneficiaryAccountNumber = beneficiaryAccountNumber;
		this.beneficiaryNickName = beneficiaryNickName;
		this.nickName = nickName;
	}
	private String beneficiaryName;
	private String beneficiaryAccountNumber;
	private String beneficiaryNickName;
	private String nickName;
	
	public String getBeneficiaryName() {
		return beneficiaryName;
	}
	public void setBeneficiaryName(String beneficiaryName) {
		this.beneficiaryName = beneficiaryName;
	}
	public String getBeneficiaryAccountNumber() {
		return beneficiaryAccountNumber;
	}
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public void setBeneficiaryAccountNumber(String beneficiaryAccountNumber) {
		this.beneficiaryAccountNumber = beneficiaryAccountNumber;
	}
	public String getBeneficiaryNickName() {
		return beneficiaryNickName;
	}
	public void setBeneficiaryNickName(String beneficiaryNickName) {
		this.beneficiaryNickName = beneficiaryNickName;
	}
	

}
