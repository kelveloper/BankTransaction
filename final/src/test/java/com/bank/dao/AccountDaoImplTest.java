package com.bank.dao;

import com.bank.model.Account;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class AccountDaoImplTest {
    private JdbcTemplate jdbc;
    private AccountDao dao;

    @Autowired
    public void CustomerDaoImplTest(JdbcTemplate jdbc){
        this.jdbc = jdbc;
        dao = new AccountDaoImpl(jdbc);
    }

    @BeforeEach
    public void setUp() {
        List<Account> accounts = dao.getAllAccounts();
        for (Account account : accounts) {
            dao.deleteAccountById(account.getAccountId());
        }
    }

    @Test
    void getAllAccounts() {
        Account account = new Account();
        account.setInterestRate(1);
        account.setBalance(1);
        account.setBalance(1);
        dao.addAccount(account);
        List<Account> accounts = dao.getAllAccounts();
        assertEquals(1, accounts.size());
    }

    @Test
    void getAllAccountsWithCustomerId() {
        Account account = new Account();
        account.setInterestRate(1);
        account.setBalance(1);
        account.setBalance(1);
        dao.addAccountwithCustomerId(account, 1);
        List<Account> accounts = dao.getAllAccountsWithCustomerId(1);
        assertEquals(1, accounts.size());

    }

    @Test
    void getAccountById() {
        Account account = new Account();
        account.setInterestRate(1);
        account.setBalance(1);
        account.setBalance(1);
        dao.addAccount(account);

        Account getAccount = dao.getAccountById(account.getAccountId());
        assertEquals(account, getAccount);
    }

    @Test
    void addAccount() {
        Account account = new Account();
        account.setInterestRate(1);
        account.setBalance(1);
        account.setBalance(1);
        Account getAccount = dao.addAccount(account);
        assertEquals(account, getAccount);
    }

    @Test
    void addAccountwithCustomerId() {
        Account account = new Account();
        account.setInterestRate(1);
        account.setBalance(1);
        account.setBalance(1);
        Account getAccount = dao.addAccountwithCustomerId(account, 1);
        assertEquals(account, getAccount);
    }

    @Test
    void updateAccount() {
        Account account = new Account();
        account.setInterestRate(1);
        account.setBalance(1);
        account.setBalance(1);
        Account getAccount = dao.addAccount(account);
        assertEquals(account, getAccount);

        account.setBalance(2);
        dao.updateAccount(account);

        Account getAccountUpdate = dao.getAccountById(account.getAccountId());
        assertEquals(account, getAccountUpdate);

    }

    @Test
    void deleteAccountById() {
        Account account1 = new Account();
        account1.setInterestRate(1);
        account1.setBalance(1);
        account1.setBalance(1);
        dao.addAccount(account1);
        Account account2 = new Account();
        account2.setInterestRate(1);
        account2.setBalance(1);
        account2.setBalance(1);
        dao.addAccount(account2);
        List<Account> accounts = dao.getAllAccounts();
        assertEquals(2, accounts.size());
        dao.deleteAccountById(account1.getAccountId());
        accounts = dao.getAllAccounts();
        assertEquals(1, accounts.size());
        assertEquals(account2, accounts.get(0));
    }
}