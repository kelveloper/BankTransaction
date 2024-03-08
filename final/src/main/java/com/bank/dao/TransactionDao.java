package com.bank.dao;

import com.bank.model.Account;
import com.bank.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.List;

public interface TransactionDao {
    Transaction createNewTransaction(Transaction transaction, int accountId);
    List<Transaction> getAllTransaction();
    Transaction findTransactionById(int id);
    List<Transaction> getAllTransactionWithAccountId(int id);
}
