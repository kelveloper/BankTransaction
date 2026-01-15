package com.bank.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.bank.model.Customer;

@Repository
public class  CustomerDaoImpl implements CustomerDao{

    @Autowired
    private final JdbcTemplate jdbcTemplate;

    public CustomerDaoImpl(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Transactional
    public Customer createNewCustomer(Customer customer) {

        final String sql = "INSERT INTO customers (firstname, lastname, email, phonenumber, bankpin) VALUES (?, ?, ?, ?, ?);";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update((Connection conn) -> {

            PreparedStatement statement = conn.prepareStatement(
                    sql,
                    Statement.RETURN_GENERATED_KEYS);

            statement.setString(1, customer.getFirstName());
            statement.setString(2, customer.getLastName());
            statement.setString(3, customer.getEmail());
            statement.setString(4, customer.getPhoneNumber());
            statement.setString(5, customer.getBankPin());
            return statement;

        }, keyHolder);
        Integer customerId = (Integer) keyHolder.getKeys().get("customerid");
        customer.setCustomerId(customerId);
        if (!customer.getBankName().trim().isEmpty()) {
            addCustomerToBank(customerId, getCustomerBankId(customer.getBankName()));
        }
        return customer;
    }


    @Override
    public List<Customer> getAllCustomers() {
        final String sql = "SELECT * FROM customers";
        return jdbcTemplate.query(sql, new CustomerMapper());
    }
    @Override
    public List<Integer> getCustomerAccounts(int id) {
        final String sql = "SELECT accountid FROM customers_accounts WHERE customerid = ?";
        return jdbcTemplate.queryForList(sql, Integer.class, id);
    }

    @Override
    public Customer findCustomerById(int id) {
        final String sql = "SELECT * FROM customers WHERE customerid = ?;";
        return jdbcTemplate.queryForObject(sql, new CustomerMapper(), id);
    }
    @Override
    public int getCustomerBank(int id){
        final String sql = "SELECT bankid FROM bank_customers WHERE customerid = ?;";
        try {
            return jdbcTemplate.queryForObject(sql, Integer.class, id);
        }
        catch(EmptyResultDataAccessException e){
            return 1;
        }

    }

    @Override
    public String getCustomerBankName(int id){
        final String sql = "SELECT name FROM banks where bankid = ?";
            return jdbcTemplate.queryForObject(sql, String.class, id);
    }
    @Override
    public int getCustomerBankId(String name){
        final String sql = "SELECT bankid FROM banks where name = ?";
        return jdbcTemplate.queryForObject(sql, Integer.class, name);
    }


    @Override
    public void updateCustomer(Customer customer) {
        final String sql = "UPDATE customers SET " 
                            + "firstname = ?,"
                            + "lastname = ?,"
                            + "email = ?,"
                            + "phonenumber = ?,"
                            + "bankpin = ? "
                            + "WHERE customerid = ?";
        jdbcTemplate.update(sql, customer.getFirstName(), customer.getLastName(), customer.getEmail(), customer.getPhoneNumber(), customer.getBankPin(), customer.getCustomerId());
        if (isCustomerAssociatedWithABank(customer.getCustomerId())){
            updateCustomerToBank(customer.getCustomerId(), getCustomerBankId(customer.getBankName()));
        }
        else{
            addCustomerToBank(customer.getCustomerId(),getCustomerBankId(customer.getBankName()) );
        }
    }

    @Override
    public void deleteCustomer(int id) {
        final String DELETE_CUSTOMER_BANK =  "DELETE FROM bank_customers WHERE customerid  = ? ";
        jdbcTemplate.update(DELETE_CUSTOMER_BANK, id);

        final String DELETE_CUSTOMER_ACCOUNT = "DELETE FROM customers_accounts WHERE customerid = ? ";
        jdbcTemplate.update(DELETE_CUSTOMER_ACCOUNT, id);

        final String DELETE_ACCOUNT = "DELETE FROM customers WHERE customerid = ?";
        jdbcTemplate.update(DELETE_ACCOUNT, id);
    }

    @Override
    public void deleteCustomerFromBank(int customerId, int bankId) {
        final String sql = "DELETE FROM bank_customers WHERE customerid = ? AND bankid = ?";
        jdbcTemplate.update(sql, customerId, bankId);
    }
    private boolean isCustomerEnrolledInBank(int customerId, int bankId){
        final String sql = "SELECT COUNT(*) FROM bank_customers WHERE customerid = ? and bankid = ?";
        int count = jdbcTemplate.queryForObject(sql, Integer.class, customerId, bankId);
        return count > 0;
    }
    private boolean isCustomerAssociatedWithABank(int customerId){
        final String sql = "SELECT COUNT(*) FROM bank_customers  WHERE customerid = ?";
        int count = jdbcTemplate.queryForObject(sql, Integer.class, customerId);
        return count > 0;
    }
    @Override
    public void addCustomerToBank(int customerId, int bankId) {
        if (isCustomerEnrolledInBank(customerId, bankId)){
            try{
                throw new EnrollmentException("Customer already enrolled in bank");
            }
            catch (EnrollmentException e){
                throw new RuntimeException(e);
            }
    }
    else{
        final String sql = "INSERT INTO bank_customers (customerid, bankid) VALUES (?, ?)";
        jdbcTemplate.update(sql, customerId, bankId);
    }
    }
    @Override
    public void updateCustomerToBank(int customerId, int bankId){
        if (!isCustomerEnrolledInBank(customerId, bankId)){
            final String sql = "UPDATE bank_customers SET bankid = ? WHERE customerid = ?;";
            jdbcTemplate.update(sql, bankId, customerId);
        }
    }

    @Override
    public void deleteAccountForCustomer(int accountId, int customerId) {
        final String sql = "DELETE FROM customers_accounts WHERE accountid = ? AND customerid = ? ";
        jdbcTemplate.update(sql, accountId, customerId);
    }
    private boolean isAccountAssociatedWithCustomer(int accountId, int customerId){
        final String sql = "SELECT COUNT(*) FROM customers_accounts WHERE accountid = ? AND customerid = ? ";
        int count = jdbcTemplate.queryForObject(sql, Integer.class, accountId, customerId );
        return count > 0;

    }
    @Override
   public Integer getCustomerForAccount(int accountId){
        final String sql = "SELECT customerid FROM customers_accounts WHERE accountid = ? ";
        int customerId = jdbcTemplate.queryForObject(sql, Integer.class, accountId );
        return  customerId;

    }
    @Override
    public void addAccountForCustomer(int accountId, int customerId) {
        if (isAccountAssociatedWithCustomer(accountId, customerId)){
            try{
                throw new EnrollmentException("Account already associated with customer");
            }
            catch(EnrollmentException e){
                throw new RuntimeException(e);
            }
        }
    
    else{
        final String sql = "INSERT INTO customers_accounts (accountid, customerid) VALUES (?, ?)";
        jdbcTemplate.update(sql, accountId, customerId);

    }
}

    public class CustomerMapper implements RowMapper<Customer>{
        @Override
        public Customer mapRow(ResultSet rs, int rowNum) throws SQLException{
            Customer customer = new Customer();
            customer.setCustomerId(rs.getInt("customerid"));
            customer.setFirstName(rs.getString("firstname"));
            customer.setLastname(rs.getString("lastname"));
            customer.setEmail(rs.getString("email"));
            customer.setPhoneNumber(rs.getString("phonenumber"));
            customer.setBankPin(rs.getString("bankpin"));
            List<Integer> accounts = getCustomerAccounts(rs.getInt("customerId"));
            customer.setAccounts(accounts);
            int bankId = getCustomerBank(rs.getInt("customerId"));
            customer.setBankName(getCustomerBankName(bankId));
            return customer;
            
        }
    }

}