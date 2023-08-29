package com.batch8group4.onlinebank.exception;

import java.util.Date;

public class ApiErrorResponse {

    private Integer errorCode;
    private String errorDescription;
    private Date date;

    public ApiErrorResponse(Integer errorCode, String errorDescription, Date date) {
        this.errorCode = errorCode;
        this.errorDescription = errorDescription;
        this.date = date;
    }

    public Integer getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(Integer errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorDescription() {
        return errorDescription;
    }

    public void setErrorDescription(String errorDescription) {
        this.errorDescription = errorDescription;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }



}
