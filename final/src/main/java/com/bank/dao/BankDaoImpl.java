package com.bank.dao;

import com.bank.dao.mapper.TransactionMapper;
import com.bank.model.Bank;
import com.bank.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class BankDaoImpl implements BankDao{

    @Autowired
    JdbcTemplate jdbc;

    public static final class BankMapper implements RowMapper<Bank> {
        @Override
        public Bank mapRow(ResultSet rs, int index) throws SQLException {
            Bank bank = new Bank();
            bank.setBankId(rs.getInt("bankId"));
            bank.setName(rs.getString("name"));
            bank.setAddress(rs.getString("address"));
            return bank;
        }
    }
    public class CustomerMapper implements RowMapper<Customer> {
        @Override
        public Customer mapRow(ResultSet rs, int rowNum) throws SQLException {
            Customer customer = new Customer();
            customer.setCustomerId(rs.getInt("customerId"));
            customer.setFirstName(rs.getString("firstName"));
            customer.setLastname(rs.getString("lastName"));
            customer.setEmail(rs.getString("email"));
            customer.setPhoneNumber(rs.getString("phoneNumber"));
            customer.setBankPin(rs.getString("bankPin"));
            return customer;

        }
    }
    @Override
    public List<Bank> getAllBanks() {
        final String SELECT_ALL_BANKS = "SELECT * FROM banks";
        return jdbc.query(SELECT_ALL_BANKS, new BankDaoImpl.BankMapper());
    }

    @Override
    public Bank getBankById(int id) {
        try {
            final String SELECT_BANKS_BY_ID = "SELECT * FROM banks WHERE bankId = ?";
            return jdbc.queryForObject(SELECT_BANKS_BY_ID, new BankDaoImpl.BankMapper(), id);
        } catch(DataAccessException ex) {
            return null;
        }
    }

    @Override
    public List<Customer> getAccountWithBankId(int id) {
        try {
            final String SELECT_ACCOUNTS_BY_ID = "select customers.customerId, customers.firstName, " +
                    "customers.lastName, customers.email,  customers.phoneNumber,  customers.bankPin from customers " +
                    "join bank_customers on  customers.customerId = bank_customers.customerID " +
                    "where bank_customers.bankId = ?";
            return jdbc.query(SELECT_ACCOUNTS_BY_ID, new BankDaoImpl.CustomerMapper(), id);
        } catch(DataAccessException ex) {
            return null;
        }
    }

    @Override
    public int getNumOfCustomers() {
        final String GET_CUSTOMER_NUM = "select count(*) from customers";
        return jdbc.queryForObject(GET_CUSTOMER_NUM, Integer.class);
    }

    @Override
    public int getNumOfCustomersWithBankId(int id) {
        final String GET_CUSTOMER_NUM = "select count(*) from customers " +
                "join bank_customers on bank_customers.customerID = customers.customerID " +
                "where bank_customers.bankId = ?";
        return jdbc.queryForObject(GET_CUSTOMER_NUM, Integer.class, id);
    }

    @Override
    public int getSumOfWithdrawsWithAccountId(int id) {
        try {
            final String sql = "SELECT SUM(amount) FROM transactions " +
                    "JOIN accounts_transactions ON accounts_transactions.transactionId = transactions.transactionID " +
                    "WHERE accounts_transactions.accountId = ? and transactions.transactionType = \"withdrawal\";";
            return jdbc.queryForObject(sql, Integer.class, id);
        } catch (NullPointerException ex) {
            return 0;
        }
    }

    @Override
    public int getSumOfDepositsWithAccountId(int id) {
        try {
            final String sql = "SELECT SUM(amount) FROM transactions " +
                    "JOIN accounts_transactions ON accounts_transactions.transactionId = transactions.transactionID " +
                    "WHERE accounts_transactions.accountId = ? and transactions.transactionType = \"deposit\";";
            return jdbc.queryForObject(sql, Integer.class, id);
        } catch (NullPointerException ex) {
            return 0;
        }
    }
}
