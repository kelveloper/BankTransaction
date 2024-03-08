package com.bank.dao;

import com.bank.model.Transaction;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class TransactionDaoImplTest {
    @Autowired
private JdbcTemplate jdbcTemplate;
    @Autowired
private TransactionDao transactionDao;

    @BeforeEach
    void setUp() {
        transactionDao = new TransactionDaoImpl(jdbcTemplate);
    }

    @Test
    void createNewTransaction() {
        // Create a test transaction and account ID
        Transaction testTransaction = new Transaction();
        testTransaction.setTransactionType("Deposit");
        testTransaction.setAmount(BigDecimal.valueOf(100.0));
        testTransaction.setDate(LocalDateTime.now());

        int accountId = 1; // Replace with a valid account ID

        // Call the method to be tested
        Transaction createdTransaction = transactionDao.createNewTransaction(testTransaction, accountId);

        // Assertions
        assertNotNull(createdTransaction.getTransactionId());
        assertEquals(testTransaction.getTransactionType(), createdTransaction.getTransactionType());
        assertEquals(testTransaction.getAmount(), createdTransaction.getAmount());
        assertEquals(testTransaction.getDate(), createdTransaction.getDate());
    }

    @Test
    void getAllTransactionWithAccountId() {
        // Replace with a valid account ID
        int accountId = 1;

        // Call the method to be tested
        List<Transaction> transactions = transactionDao.getAllTransactionWithAccountId(accountId);

        // Assertions
        assertNotNull(transactions, "Transactions list should not be null");
        assertFalse(transactions.isEmpty(), "Transactions list should not be empty for account ID: " + accountId);
    }

    @Test
    void getAllTransaction() {
        // Call the method to be tested
        List<Transaction> transactions = transactionDao.getAllTransaction();

        // Assertions
        assertNotNull(transactions);
        assertFalse(transactions.isEmpty());
    }

    @Test
    void findTransactionById() {
        // Replace with a valid transaction ID
        int transactionId = 1;

        // Call the method to be tested
        Transaction foundTransaction = transactionDao.findTransactionById(transactionId);

        // Assertions
        assertNotNull(foundTransaction);
        assertEquals(transactionId, foundTransaction.getTransactionId());
    }

}