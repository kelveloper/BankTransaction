package com.bank.controller;

import com.bank.model.Transaction;
import com.bank.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @GetMapping("/transactions")
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransaction();
    }

   @GetMapping("/{id}")
    public Transaction getTransactionById(@PathVariable int id) {
        return transactionService.getTransactionById(id);
    }

    @PostMapping("/add/{id}")
    public Transaction addTransaction(@RequestBody Transaction transaction, @PathVariable int id) {
        return transactionService.addNewTransaction(transaction.getTransactionType(), transaction.getAmount(), id);
    }

    @PostMapping("/transfer")
    public Transaction transferBetweenAccounts(@RequestBody Map<String, Object> transferRequest) {
        BigDecimal amount = new BigDecimal(transferRequest.get("amount").toString());
        int currentAccountId = Integer.parseInt(transferRequest.get("currentAccountId").toString());
        int newAccountId = Integer.parseInt(transferRequest.get("newAccountId").toString());

        return transactionService.createNewTransfer(amount, currentAccountId, newAccountId);
    }

    @PostMapping("/transfer/{id}")
    public Transaction transferToAnotherAccount(
            @PathVariable("id") int currentAccountId,
            @RequestBody Map<String, Object> transferRequest) {

        BigDecimal amount = new BigDecimal(transferRequest.get("amount").toString());
        int newAccountId = Integer.parseInt(transferRequest.get("newAccountID").toString());

        return transactionService.createNewTransfer(amount, currentAccountId, newAccountId);
    }
    @GetMapping("transactions/account/{id}")
    public List<Transaction> getAllTransactionWithAccountId(@PathVariable int id) {
        return transactionService.getAllTransactionWithAccountId(id);
    }
}
