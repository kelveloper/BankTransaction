package com.bank.dao;

import java.util.List;

import com.bank.model.Customer;

public interface CustomerDao {
    Customer createNewCustomer(Customer customer);

    List<Customer> getAllCustomers();

    Customer findCustomerById(int customerId);

    void updateCustomer(Customer customer);

    void deleteCustomer(int customerId);

    void deleteCustomerFromBank(int customerId, int bankId);

    void addCustomerToBank(int customerId, int courseId);

    void deleteAccountForCustomer(int accountId, int customerId);

    void addAccountForCustomer(int accountId, int customerId);
    int getCustomerBank(int id);
    String getCustomerBankName(int id);
    List<Integer> getCustomerAccounts(int id);
    int getCustomerBankId(String name);
    void updateCustomerToBank(int customerId, int bankId);
    Integer getCustomerForAccount(int accountId);
}
