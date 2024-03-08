package com.bank.service;

import com.bank.dao.AccountDao;
import com.bank.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService{

    @Autowired
    AccountDao dao;

    @Override
    public List<Account> getAllAccounts() {
        return dao.getAllAccounts();
    }

    @Override
    public List<Account> getAllAccountsWithCustomerId(int id) {return dao.getAllAccountsWithCustomerId(id);}

    @Override
    public Account getAccountById(int id) {
        return dao.getAccountById(id);
    }

    @Override
    public Account addAccount(Account account) {
        return dao.addAccount(account);
    }

    @Override
    public Account addAccountwithCustomerId(Account account, int id) {
        return dao.addAccountwithCustomerId(account, id);
    }

    @Override
    public void updateAccount(Account account) {
        dao.updateAccount(account);
    }

    @Override
    public void deleteAccountById(int id) {
        dao.deleteAccountById(id);
    }
}
