package com.batch8group4.onlinebank.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

public class CustomerApplyForm {
	@Size(max=4, message = "Title should not be more than 4 characters")
	private String title;
	private String firstName;
	private String middleName;
	private String lastName;
	private String fatherName;
	@Pattern(regexp="(^[0-9]{10}$)", message = "Mobile number should be of 10 digits")
	private String mobileNumber;
	@Email
	private String emailId;
	@Pattern(regexp="(^[0-9]{12}$)", message = "Aadhar number should be of 10 digits")
	private String adharNumber;
	private String dob;
	private String residentialLine1;
	private String residentialLine2;
	private String residentialLandmark;
	private String residentialState;
	private String residentialPincode;
	private String permanentLine1;
	private String permanentLine2;
	private String permanentLandmark;
	private String permanentState;
	private String permanentPincode;
	private String occupationType;
	private String sourceOfIncome;
	private Long grossAnnualIncome;
	private String netBankingBool;
	private String debitCardBool;
	@Override
	public String toString() {
		return "CustomerApplyForm [title=" + title + ", firstName=" + firstName + ", middleName=" + middleName
				+ ", lastName=" + lastName + ", fatherName=" + fatherName + ", mobileNumber=" + mobileNumber
				+ ", emailId=" + emailId + ", adharNumber=" + adharNumber + ", dob=" + dob + ", residentialLine1="
				+ residentialLine1 + ", residentialLine2=" + residentialLine2 + ", residentialLandmark="
				+ residentialLandmark + ", residentialState=" + residentialState + ", residentialPincode="
				+ residentialPincode + ", permanentLine1=" + permanentLine1 + ", permanentLine2=" + permanentLine2
				+ ", permanentLandmark=" + permanentLandmark + ", permanentState=" + permanentState
				+ ", permanentPincode=" + permanentPincode + ", occupationType=" + occupationType + ", sourceOfIncome="
				+ sourceOfIncome + ", grossAnnualIncome=" + grossAnnualIncome + ", netBankingBool=" + netBankingBool
				+ ", debitCardBool=" + debitCardBool + "]";
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getMiddleName() {
		return middleName;
	}
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getFatherName() {
		return fatherName;
	}
	public void setFatherName(String fatherName) {
		this.fatherName = fatherName;
	}
	public String getMobileNumber() {
		return mobileNumber;
	}
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getAdharNumber() {
		return adharNumber;
	}
	public void setAdharNumber(String adharNumber) {
		this.adharNumber = adharNumber;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public String getResidentialLine1() {
		return residentialLine1;
	}
	public void setResidentialLine1(String residentialLine1) {
		this.residentialLine1 = residentialLine1;
	}
	public String getResidentialLine2() {
		return residentialLine2;
	}
	public void setResidentialLine2(String residentialLine2) {
		this.residentialLine2 = residentialLine2;
	}
	public String getResidentialLandmark() {
		return residentialLandmark;
	}
	public void setResidentialLandmark(String residentialLandmark) {
		this.residentialLandmark = residentialLandmark;
	}
	public String getResidentialState() {
		return residentialState;
	}
	public void setResidentialState(String residentialState) {
		this.residentialState = residentialState;
	}
	public String getResidentialPincode() {
		return residentialPincode;
	}
	public void setResidentialPincode(String residentialPincode) {
		this.residentialPincode = residentialPincode;
	}
	public String getPermanentLine1() {
		return permanentLine1;
	}
	public void setPermanentLine1(String permanentLine1) {
		this.permanentLine1 = permanentLine1;
	}
	public String getPermanentLine2() {
		return permanentLine2;
	}
	public void setPermanentLine2(String permanentLine2) {
		this.permanentLine2 = permanentLine2;
	}
	public String getPermanentLandmark() {
		return permanentLandmark;
	}
	public void setPermanentLandmark(String permanentLandmark) {
		this.permanentLandmark = permanentLandmark;
	}
	public String getPermanentState() {
		return permanentState;
	}
	public void setPermanentState(String permanentState) {
		this.permanentState = permanentState;
	}
	public String getPermanentPincode() {
		return permanentPincode;
	}
	public void setPermanentPincode(String permanentPincode) {
		this.permanentPincode = permanentPincode;
	}
	public String getOccupationType() {
		return occupationType;
	}
	public void setOccupationType(String occupationType) {
		this.occupationType = occupationType;
	}
	public String getSourceOfIncome() {
		return sourceOfIncome;
	}
	public void setSourceOfIncome(String sourceOfIncome) {
		this.sourceOfIncome = sourceOfIncome;
	}
	public Long getGrossAnnualIncome() {
		return grossAnnualIncome;
	}
	public void setGrossAnnualIncome(Long grossAnnualIncome) {
		this.grossAnnualIncome = grossAnnualIncome;
	}
	public String getNetBankingBool() {
		return netBankingBool;
	}
	public void setNetBankingBool(String netBankingBool) {
		this.netBankingBool = netBankingBool;
	}
	public String getDebitCardBool() {
		return debitCardBool;
	}
	public void setDebitCardBool(String debitCardBool) {
		this.debitCardBool = debitCardBool;
	}
	
}
