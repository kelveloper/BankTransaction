package com.bank.dao;

import com.bank.model.Account;

import java.util.List;

public interface AccountDao {
    List<Account> getAllAccounts();
    Account getAccountById(int id);
    public Account addAccountwithCustomerId(Account account, int id);
    List<Account> getAllAccountsWithCustomerId(int id);
    Account addAccount(Account account);
    void updateAccount(Account account);
    void deleteAccountById(int id);
}
