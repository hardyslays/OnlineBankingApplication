package com.batch8group4.onlinebank.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "Customer")
public class Customer {
	//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long serialNumber;
	@Id
	private String customerId;
	private String title;
	private String firstName;
	private String middleName;
	private String lastName;
	private String fatherName;
	@Column(nullable=false, unique=true)
	private String mobileNumber;
	@Column(nullable=false, unique=true)
	private String emailId;
	@Column(nullable=false, unique=true)
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
	private boolean approvedBool;

	public String getCustomerId() {

		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
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

	public String getPermanentPincode() {
		return permanentPincode;
	}

	public void setPermanentPincode(String permanentPincode) {
		this.permanentPincode = permanentPincode;
	}

	
	@Override
	public String toString() {
		return "Customer [customerId=" + customerId + ", title=" + title + ", firstName=" + firstName + ", middleName="
				+ middleName + ", lastName=" + lastName + ", fatherName=" + fatherName + ", mobileNumber="
				+ mobileNumber + ", emailId=" + emailId + ", adharNumber=" + adharNumber + ", dob=" + dob
				+ ", residentialLine1=" + residentialLine1 + ", residentialLine2=" + residentialLine2
				+ ", residentialLandmark=" + residentialLandmark + ", residentialState=" + residentialState
				+ ", residentialPincode=" + residentialPincode + ", permanentLine1=" + permanentLine1
				+ ", permanentLine2=" + permanentLine2 + ", permanentLandmark=" + permanentLandmark
				+ ", permanentState=" + permanentState + ", permanentPincode=" + permanentPincode + ", occupationType="
				+ occupationType + ", sourceOfIncome=" + sourceOfIncome + ", grossAnnualIncome=" + grossAnnualIncome
				+ ", netBankingBool=" + netBankingBool + ", debitCardBool=" + debitCardBool + ", approvedBool="
				+ approvedBool + ", getCustomerId()=" + getCustomerId() + ", getTitle()=" + getTitle()
				+ ", getFirstName()=" + getFirstName() + ", getMiddleName()=" + getMiddleName() + ", getLastName()="
				+ getLastName() + ", getFatherName()=" + getFatherName() + ", getMobileNumber()=" + getMobileNumber()
				+ ", getEmailId()=" + getEmailId() + ", getAdharNumber()=" + getAdharNumber() + ", getDob()=" + getDob()
				+ ", getNetBankingBool()=" + getNetBankingBool() + ", getDebitCardBool()=" + getDebitCardBool()
				+ ", getResidentialLine1()=" + getResidentialLine1() + ", getResidentialLine2()="
				+ getResidentialLine2() + ", getResidentialLandmark()=" + getResidentialLandmark()
				+ ", getResidentialState()=" + getResidentialState() + ", getResidentialPincode()="
				+ getResidentialPincode() + ", getPermanentLine1()=" + getPermanentLine1() + ", getPermanentLine2()="
				+ getPermanentLine2() + ", getPermanentLandmark()=" + getPermanentLandmark() + ", getPermanentState()="
				+ getPermanentState() + ", getOccupationType()=" + getOccupationType() + ", getSourceOfIncome()="
				+ getSourceOfIncome() + ", getGrossAnnualIncome()=" + getGrossAnnualIncome()
				+ ", getPermanentPincode()=" + getPermanentPincode() + ", getApprovedBool()=" + getApprovedBool()
				+ ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString()
				+ "]";
	}

	public boolean getApprovedBool() {
		return approvedBool;
	}

	public void setApprovedBool(boolean approvedBool) {
		this.approvedBool = approvedBool;
	}

}

//	public Long getSerialNumber() {
//		return serialNumber;
//	}
//	public void setSerialNumber(Long serialNumber) {
//		this.serialNumber = serialNumber;
//	}
	

