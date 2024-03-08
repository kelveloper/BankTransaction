package com.bank.controller;


import com.bank.dao.AccountDao;
import com.bank.model.Account;
import com.bank.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AccountController {

    @Autowired
    AccountService service;
    @GetMapping("/accounts")
    public List<Account> getAllAccounts() {
        return service.getAllAccounts();
    }
    @GetMapping("/accounts/customer/{id}")
    public List<Account> getAllAccountsByCustomerId(@PathVariable int id) {
        return service.getAllAccountsWithCustomerId(id);
    }

    @GetMapping("/accounts/{id}")
    public Account getByAccountID(@PathVariable int id) {
        return service.getAccountById(id);
    }

    @PostMapping("/accounts/add")
    public Account addAccount(@RequestBody Account account) {
        return service.addAccount(account);
    }

    @PostMapping("/accounts/add/{id}")
    public Account addAccountByCustomerID(@RequestBody Account account, @PathVariable int id) {
        return service.addAccountwithCustomerId(account, id);
    }

    @PutMapping("/accounts/update")
    public void updateAccount(@RequestBody Account account) {
        service.updateAccount(account);
    }

    @DeleteMapping("/accounts/delete/{id}")
    public void deleteAccount(@PathVariable int id) {
        service.deleteAccountById(id);
    }

}
