package com.batch8group4.onlinebank.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(value = CustomerNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleCustomerNotFoundException(){
        ApiErrorResponse apiErrorResponse=new ApiErrorResponse(404, "Customer does not exist",new Date());
        return new ResponseEntity<ApiErrorResponse>(apiErrorResponse,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = InsufficientFundsException.class)
    public ResponseEntity<ApiErrorResponse> handleInsufficientFundsException()
    {
        ApiErrorResponse apiErrorResponse=new ApiErrorResponse(500,"Insufficient funds",new Date());
        return new ResponseEntity<ApiErrorResponse>(apiErrorResponse,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = NoTransactionsException.class)
    public ResponseEntity<ApiErrorResponse> handleNoTransactionsException()
    {
        ApiErrorResponse apiErrorResponse=new ApiErrorResponse(404,"No transactions found", new Date());
        return new ResponseEntity<ApiErrorResponse>(apiErrorResponse,HttpStatus.NOT_FOUND);
    }
}

