package com.bank.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.dao.CustomerDao;
import com.bank.model.Customer;

@Service
public class CustomerServiceImpl implements CustomerServiceInterface {
    @Autowired 
    CustomerDao customerDao;

    @Override
    public List<Customer> getAllCustomers() {
        return customerDao.getAllCustomers();
    }
    public List<Integer> getCustomerAccounts(int id){return customerDao.getCustomerAccounts(id);}
    @Override
    public Customer getCustomerById(int id) {
        return customerDao.findCustomerById(id);
    }
    @Override
    public  int getCustomerBank(int id){
        return customerDao.getCustomerBank(id);
    }
    @Override
    public Customer addNewCustomer(Customer customer) {
        return customerDao.createNewCustomer(customer);
    }

    @Override
    public void updateCustomerData( Customer customer) {
        customerDao.updateCustomer( customer);
    }

    @Override
    public void deleteCustomerById(int id) {
       customerDao.deleteCustomer(id);
    }

    @Override
    public void deleteCustomerFromBank(int customerId, int bankId) {
        customerDao.deleteCustomerFromBank(customerId, bankId);
    }

    @Override
    public void addCustomerToBank(int customerId, int bankId) {
        customerDao.addCustomerToBank(customerId, bankId);
    }

    @Override
    public void deleteAccountForCustomer(int accountId, int customerId) {
        customerDao.deleteAccountForCustomer(accountId, customerId);
    }

    @Override
    public void addAccountForCustomer(int accountId, int customerId) {
       customerDao.addAccountForCustomer(accountId, customerId);
    }
    @Override
    public Integer getCustomerForAccount(int accountId){
        return customerDao.getCustomerForAccount(accountId);
    }

    
}
