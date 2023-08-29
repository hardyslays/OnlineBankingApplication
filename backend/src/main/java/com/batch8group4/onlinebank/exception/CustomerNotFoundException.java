package com.batch8group4.onlinebank.exception;

public class CustomerNotFoundException extends RuntimeException {
    public CustomerNotFoundException(String message)
    {
        super(message);
    }
}
