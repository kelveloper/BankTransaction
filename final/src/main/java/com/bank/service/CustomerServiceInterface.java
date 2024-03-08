package com.bank.service;

import java.util.List;

import com.bank.model.Customer;

public interface CustomerServiceInterface {
    List<Customer> getAllCustomers();
    List<Integer> getCustomerAccounts(int id);
    Customer getCustomerById(int id);
    int getCustomerBank(int id);
    Customer addNewCustomer(Customer customer);
    void updateCustomerData(Customer customer);
    void deleteCustomerById(int id);
    void deleteCustomerFromBank(int customerId, int bankId);
    void addCustomerToBank(int customerId, int bankId);
    void deleteAccountForCustomer(int accountId, int customerId);
    void addAccountForCustomer(int accountId, int customerId);
    Integer getCustomerForAccount(int accountId);
}
