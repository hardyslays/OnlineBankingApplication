package com.batch8group4.onlinebank.exception;

public class NoTransactionsException extends RuntimeException{
    public NoTransactionsException(String message)
    {
        super(message);
    }
}
