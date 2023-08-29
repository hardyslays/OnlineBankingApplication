package com.batch8group4.onlinebank.exception;

public class InsufficientFundsException extends RuntimeException{
    public InsufficientFundsException(String message)
    {
        super(message);
    }
}
