package com.bank.controller;

import com.bank.model.Account;
import com.bank.model.Bank;
import com.bank.model.Customer;
import com.bank.service.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BankController {
    @Autowired
    BankService service;

    @GetMapping("/banks")
    public List<Bank> allBanks() {
        return service.getAllBanks();
    }
    @GetMapping("/banks/{id}")
    public Bank getBankByID(@PathVariable int id) {
        return service.getBankById(id);
    }

    @GetMapping("/banks/customers/{id}")
    public List<Customer> getCustomersByID(@PathVariable int id) {
        return service.getAccountWithBankId(id);
    }

    @GetMapping("/banks/customers/count")
    public int getCustomersCount() {
        return service.getNumOfCustomers();
    }

    @GetMapping("/banks/customers/count/{id}")
    public int getCustomersCountByID(@PathVariable int id) {
        return service.getNumOfCustomersWithBankId(id);
    }

    @GetMapping("/banks/withdraw/{id}")
    public int getSumOfWithdrawsWithAccountId(@PathVariable int id) {
        return service.getSumOfWithdrawsWithAccountId(id);
    }

    @GetMapping("/banks/deposit/{id}")
    public int getSumOfDepositsWithAccountId(@PathVariable int id) {
        return service.getSumOfDepositsWithAccountId(id);
    }
}
