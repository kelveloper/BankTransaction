package com.bank.service;

import com.bank.model.Transaction;

import java.math.BigDecimal;
import java.util.List;

public interface TransactionService {
    Transaction addNewTransaction(String transactionType, BigDecimal amount, int accountId);
    Transaction createNewTransfer(BigDecimal amount, int currentAccountId, int newAccountId);

    void updateAccountBalance(int accountId, String transactionType, BigDecimal amount);

    List<Transaction> getAllTransaction();
    Transaction getTransactionById(int id);
    List<Transaction> getAllTransactionWithAccountId(int accountId);

}
