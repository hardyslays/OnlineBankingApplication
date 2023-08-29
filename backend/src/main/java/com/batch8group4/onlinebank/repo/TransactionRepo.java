package com.batch8group4.onlinebank.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.batch8group4.onlinebank.model.Transaction;

public interface TransactionRepo extends JpaRepository<Transaction,String>{
    List<Transaction> findByFromAccount(String fromAccount);
    List<Transaction> findByBeneficiaryAccount(String beneficiaryAccount);
}
