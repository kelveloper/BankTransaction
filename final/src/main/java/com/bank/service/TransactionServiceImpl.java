package com.bank.service;

import com.bank.dao.AccountDao;
import com.bank.dao.TransactionDao;
import com.bank.model.Account;
import com.bank.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
@Service
public class TransactionServiceImpl implements TransactionService{
    @Autowired
    TransactionDao transactionDao;
    @Autowired
    private AccountDao accountDao;


    @Override
    public Transaction addNewTransaction(String transactionType, BigDecimal amount, int accountId) {
        Transaction transaction = new Transaction();

        transaction.setTransactionType(transactionType);
        transaction.setAmount(amount);
        transaction.setDate(LocalDateTime.now());

        transactionDao.createNewTransaction(transaction, accountId);
        updateAccountBalance(accountId, transactionType, amount);

        return transaction;
    }

    @Override
    public Transaction createNewTransfer(BigDecimal amount, int currentAccountId, int newAccountId) {

        Transaction withdrawal = addNewTransaction("Withdrawal", amount, currentAccountId);
        Transaction deposit = addNewTransaction("Deposit", amount, newAccountId);

        return withdrawal;
    }
    @Override
    public void updateAccountBalance(int accountId, String transactionType, BigDecimal amount) {
        Account account = accountDao.getAccountById(accountId);

        if (account != null) {
            double newBalance; // if

            // Update balance based on transaction type
            if ("withdrawal".equalsIgnoreCase(transactionType)) {
                newBalance = account.getBalance() - amount.doubleValue();
            } else if ("deposit".equalsIgnoreCase(transactionType)) {
                newBalance = account.getBalance() + amount.doubleValue();
            } else {
                // Handle other transaction types if needed (transfer?)
                return;
            }

            // Update the account balance
            account.setBalance(newBalance);
            accountDao.updateAccount(account);
        }
    }


    @Override
    public List<Transaction> getAllTransaction() {
        return transactionDao.getAllTransaction();
    }
    @Override
    public Transaction getTransactionById(int id) {

        try {
            return transactionDao.findTransactionById(id);
        } catch (DataAccessException e) {
            Transaction notFoundTransaction = new Transaction();
            notFoundTransaction.setTransactionType("Transaction Not Found");
            notFoundTransaction.setAmount(null);
            return  notFoundTransaction;
        }

    }

    @Override
    public List<Transaction> getAllTransactionWithAccountId(int accountId) {
        return transactionDao.getAllTransactionWithAccountId(accountId);
    }

}
