package com.bank.service;

import com.bank.model.Account;

import java.util.List;

public interface AccountService {
    List<Account> getAllAccounts();
    List<Account> getAllAccountsWithCustomerId(int id);
    Account getAccountById(int id);
    Account addAccount(Account account);
    public Account addAccountwithCustomerId(Account account, int id);
    void updateAccount(Account account);
    void deleteAccountById(int id);
}
