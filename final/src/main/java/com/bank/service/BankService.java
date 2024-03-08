package com.bank.service;

import com.bank.model.Bank;
import com.bank.model.Customer;

import java.util.List;

public interface BankService {
    List<Bank> getAllBanks();
    Bank getBankById(int id);
    List<Customer> getAccountWithBankId(int id);

    int getNumOfCustomers();
    int getNumOfCustomersWithBankId(int id);

    int getSumOfWithdrawsWithAccountId(int id);
    int getSumOfDepositsWithAccountId(int id);
}
