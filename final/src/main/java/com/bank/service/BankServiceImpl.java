package com.bank.service;

import com.bank.dao.AccountDao;
import com.bank.dao.BankDao;
import com.bank.model.Bank;
import com.bank.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BankServiceImpl implements BankService{
    @Autowired
    BankDao dao;
    @Override
    public List<Bank> getAllBanks() {
        return dao.getAllBanks();
    }

    @Override
    public Bank getBankById(int id) {
        return dao.getBankById(id);
    }

    @Override
    public List<Customer> getAccountWithBankId(int id) {
        return dao.getAccountWithBankId(id);
    }

    @Override
    public int getNumOfCustomers() {
        return dao.getNumOfCustomers();
    }

    @Override
    public int getNumOfCustomersWithBankId(int id) {
        return dao.getNumOfCustomersWithBankId(id);
    }

    @Override
    public int getSumOfWithdrawsWithAccountId(int id) {
        return dao.getSumOfWithdrawsWithAccountId(id);
    }

    @Override
    public int getSumOfDepositsWithAccountId(int id) {
        return dao.getSumOfDepositsWithAccountId(id);
    }


}
