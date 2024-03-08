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

        final String sql = "INSERT INTO customers (firstName, lastName, email, phoneNumber, bankPin) VALUES (?, ?, ?, ?, ?);";
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
        customer.setCustomerId(keyHolder.getKey().intValue());
        if (!customer.getBankName().trim().isEmpty()) {
            addCustomerToBank(keyHolder.getKey().intValue(), getCustomerBankId(customer.getBankName()));
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
        final String sql = "SELECT accountId FROM customers_accounts WHERE customerID = ?";
        return jdbcTemplate.queryForList(sql, Integer.class, id);
    }

    @Override
    public Customer findCustomerById(int id) {
        final String sql = "SELECT * FROM customers WHERE customerId = ?;";
        return jdbcTemplate.queryForObject(sql, new CustomerMapper(), id);
    }
    @Override
    public int getCustomerBank(int id){
        final String sql = "SELECT bankId FROM bank_customers WHERE customerID = ?;";
        try {
            return jdbcTemplate.queryForObject(sql, Integer.class, id);
        }
        catch(EmptyResultDataAccessException e){
            return 1;
        }

    }

    @Override
    public String getCustomerBankName(int id){
        final String sql = "SELECT name FROM banks where bankId = ?";
            return jdbcTemplate.queryForObject(sql, String.class, id);
    }
    @Override
    public int getCustomerBankId(String name){
        final String sql = "SELECT bankId FROM banks where name = ?";
        return jdbcTemplate.queryForObject(sql, Integer.class, name);
    }


    @Override
    public void updateCustomer(Customer customer) {
        final String sql = "UPDATE customers SET " 
                            + "firstName = ?,"
                            + "lastName = ?,"
                            + "email = ?,"
                            + "phoneNumber = ?,"
                            + "bankPin = ?"
                            + "WHERE customerId = ?";
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
        final String DELETE_CUSTOMER_BANK =  "DELETE FROM bank_customers WHERE customerID  = ? ";
        jdbcTemplate.update(DELETE_CUSTOMER_BANK, id);

        final String DELETE_CUSTOMER_ACCOUNT = "DELETE FROM customers_accounts WHERE customerID = ? ";
        jdbcTemplate.update(DELETE_CUSTOMER_ACCOUNT, id);

        final String DELETE_ACCOUNT = "DELETE FROM customers WHERE customerId = ?";
        jdbcTemplate.update(DELETE_ACCOUNT, id);
    }

    @Override
    public void deleteCustomerFromBank(int customerId, int bankId) {
        final String sql = "DELETE FROM bank_customers WHERE customerID = ? AND bankId = ?";
        jdbcTemplate.update(sql, customerId, bankId);
    }
    private boolean isCustomerEnrolledInBank(int customerId, int bankId){
        final String sql = "SELECT COUNT(*) FROM bank_customers WHERE customerID = ? and bankId = ?";
        int count = jdbcTemplate.queryForObject(sql, Integer.class, customerId, bankId);
        return count > 0;
    }
    private boolean isCustomerAssociatedWithABank(int customerId){
        final String sql = "SELECT COUNT(*) FROM bank_customers  WHERE customerID = ?";
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
        final String sql = "INSERT INTO bank_customers (customerID, bankId) VALUES (?, ?)";
        jdbcTemplate.update(sql, customerId, bankId);
    }
    }
    @Override
    public void updateCustomerToBank(int customerId, int bankId){
        if (!isCustomerEnrolledInBank(customerId, bankId)){
            final String sql = "UPDATE bank_customers SET bankId = ? WHERE customerId = ?;";
            jdbcTemplate.update(sql, bankId, customerId);
        }
    }

    @Override
    public void deleteAccountForCustomer(int accountId, int customerId) {
        final String sql = "DELETE FROM customers_accounts WHERE accountId = ? AND customerID = ? ";
        jdbcTemplate.update(sql, accountId, customerId);
    }
    private boolean isAccountAssociatedWithCustomer(int accountId, int customerId){
        final String sql = "SELECT COUNT(*) FROM customers_accounts WHERE accountId = ? AND customerID = ? ";
        int count = jdbcTemplate.queryForObject(sql, Integer.class, accountId, customerId );
        return count > 0;

    }
    @Override
   public Integer getCustomerForAccount(int accountId){
        final String sql = "SELECT customerID FROM customers_accounts WHERE accountId = ? ";
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
        final String sql = "INSERT INTO customers_accounts (accountId, customerId) VALUES (?, ?)";
        jdbcTemplate.update(sql, accountId, customerId);

    }
}

    public class CustomerMapper implements RowMapper<Customer>{
        @Override
        public Customer mapRow(ResultSet rs, int rowNum) throws SQLException{
            Customer customer = new Customer();
            customer.setCustomerId(rs.getInt("customerId"));
            customer.setFirstName(rs.getString("firstName"));
            customer.setLastname(rs.getString("lastName"));
            customer.setEmail(rs.getString("email"));
            customer.setPhoneNumber(rs.getString("phoneNumber"));
            customer.setBankPin(rs.getString("bankPin"));
            List<Integer> accounts = getCustomerAccounts(rs.getInt("customerId"));
            customer.setAccounts(accounts);
            int bankId = getCustomerBank(rs.getInt("customerId"));
            customer.setBankName(getCustomerBankName(bankId));
            return customer;
            
        }
    }

}