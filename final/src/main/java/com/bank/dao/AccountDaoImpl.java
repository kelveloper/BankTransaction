package com.bank.dao;

import com.bank.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.List;

@Repository
public class AccountDaoImpl implements AccountDao{

    @Autowired
    JdbcTemplate jdbc;

    public AccountDaoImpl(JdbcTemplate jdbc){
        this.jdbc = jdbc;
    }

    public static final class AccountMapper implements RowMapper<Account> {

        @Override
        public Account mapRow(ResultSet rs, int index) throws SQLException {
            Account acc = new Account();
            acc.setAccountId(rs.getInt("accountId"));
            acc.setBalance(rs.getDouble("balance"));
            acc.setAccountType(rs.getString("accountType"));
            acc.setInterestRate(rs.getDouble("interestRate"));
            return acc;
        }
    }

    @Override
    public List<Account> getAllAccounts() {
        final String SELECT_ALL_ACCOUNTS = "SELECT * FROM accounts";
        return jdbc.query(SELECT_ALL_ACCOUNTS, new AccountMapper());
    }

    @Override
    public List<Account> getAllAccountsWithCustomerId(int id) {
        final String SELECT_ALL_ACCOUNTS = "select accounts.accountId, accounts.balance, accounts.accountType, accounts.interestRate " +
                "from accounts " +
                "join customers_accounts on accounts.accountId = customers_accounts.accountId " +
                "where customers_accounts.customerID = ?;";
        return jdbc.query(SELECT_ALL_ACCOUNTS, new AccountMapper(), id);
    }

    @Override
    public Account getAccountById(int id) {
        try {
            final String SELECT_ACCOUNTS_BY_ID = "SELECT * FROM accounts WHERE accountId = ?";
            return jdbc.queryForObject(SELECT_ACCOUNTS_BY_ID, new AccountMapper(), id);
        } catch(DataAccessException ex) {
            return null;
        }
    }

    @Override
    public Account addAccount(Account account) {
        final String INSERT_ACCOUNT = "INSERT INTO accounts(balance, accountType, interestRate) "
                + "VALUES(?,?,?)";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        jdbc.update((Connection conn) -> {

            PreparedStatement statement = conn.prepareStatement(
                    INSERT_ACCOUNT,
                    Statement.RETURN_GENERATED_KEYS);

            statement.setDouble(1, account.getBalance());
            statement.setString(2,  account.getAccountType());
            statement.setDouble(3,  account.getInterestRate());
            return statement;

        }, keyHolder);
        account.setAccountId(keyHolder.getKey().intValue());
        return account;
    }
    @Override
    public Account addAccountwithCustomerId(Account account, int id) {
        final String INSERT_ACCOUNT = "INSERT INTO accounts(balance, accountType, interestRate) "
                + "VALUES(?,?,?)";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        jdbc.update((Connection conn) -> {

            PreparedStatement statement = conn.prepareStatement(
                    INSERT_ACCOUNT,
                    Statement.RETURN_GENERATED_KEYS);

            statement.setDouble(1, account.getBalance());
            statement.setString(2,  account.getAccountType());
            statement.setDouble(3,  account.getInterestRate());
            return statement;

        }, keyHolder);
        account.setAccountId(keyHolder.getKey().intValue());
        final String INSERT_CUSTOMER_ACCOUNT = "INSERT INTO customers_accounts(customerID, accountId) "
                + "VALUES(?,?)";
        jdbc.update(INSERT_CUSTOMER_ACCOUNT,
                id,
                account.getAccountId());
        return account;
    }

    @Override
    public void updateAccount(Account account) {
        final String UPDATE_ACCOUNT = "UPDATE accounts SET balance = ?, accountType = ?,  interestRate = ?"
                + "WHERE accountId = ?";
        jdbc.update(UPDATE_ACCOUNT,
                account.getBalance(),
                account.getAccountType(),
                account.getInterestRate(),
                account.getAccountId());
    }

    @Override
    public void deleteAccountById(int id) {
        final String DELETE_CUSTOMER_ACCOUNT = "DELETE FROM customers_accounts "
                + "WHERE accountId = ?";
        jdbc.update(DELETE_CUSTOMER_ACCOUNT, id);

        final String DELETE_ACCOUNT_TRANSACTION = "DELETE FROM accounts_transactions "
                + "WHERE accountId = ?";
        jdbc.update(DELETE_ACCOUNT_TRANSACTION, id);

        final String DELETE_ACCOUNT = "DELETE FROM accounts WHERE accountId = ?";
        jdbc.update(DELETE_ACCOUNT, id);
    }
}
