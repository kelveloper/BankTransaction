package com.bank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.model.Customer;
import com.bank.service.CustomerServiceImpl;

@RestController
@RequestMapping("/api")
public class CustomerController {
    @Autowired
    CustomerServiceImpl customerServiceImpl;

    @GetMapping("/customers")
    public List<Customer> getAllCustomers(){
        return customerServiceImpl.getAllCustomers();
    }
    @GetMapping("/customers/{id}/accounts")
    public List<Integer> getCustomerAccounts(@PathVariable int id){
        return customerServiceImpl.getCustomerAccounts(1);
    }
    @PostMapping("/customers/add")
    public Customer addCustomer(@RequestBody Customer customer){

        return  customerServiceImpl.addNewCustomer(customer);
    }
    @GetMapping("/customers/{id}")
    public Customer getCustomerById(@PathVariable int id){
        return customerServiceImpl.getCustomerById(id);
    }
    @PutMapping("customers/{id}")
    public void updateCustomer(@PathVariable int id, @RequestBody Customer customer){
        customerServiceImpl.updateCustomerData(customer);
    }
    @DeleteMapping("customers/{id}")
    public void deleteEmployee(@PathVariable int id){
        customerServiceImpl.deleteCustomerById(id);
    }
    @DeleteMapping("customers/{customerId}/banks/{bankId}")
    public void deleteCustomerFromBank(@PathVariable int customerId, @PathVariable int bankId){
        customerServiceImpl.deleteCustomerFromBank(customerId, bankId);
    }
    @PostMapping("/customers/{customerId}/banks/{bankId}")
    public void addCustomerToBank(@PathVariable int customerId, @PathVariable int bankId){
        customerServiceImpl.addCustomerToBank(customerId, bankId);
    }
    @DeleteMapping("/customers/{customerId}/accounts/{accountId}")
    public void deleteAccountForCustomer(@PathVariable int customerId, @PathVariable int accountId){
        customerServiceImpl.deleteAccountForCustomer(accountId, customerId);
    }
    @PostMapping("/customers/{customerId}/accounts/{accountId}")
    public void addAccountForCustomer(@PathVariable int accountId, @PathVariable int customerId){
        customerServiceImpl.addAccountForCustomer(accountId, customerId);
    }

    @GetMapping("/customers/accounts/{accountId}")
    public Integer getCustomerForAccount(@PathVariable int  accountId){
        return  customerServiceImpl.getCustomerForAccount(accountId);
    }
}
