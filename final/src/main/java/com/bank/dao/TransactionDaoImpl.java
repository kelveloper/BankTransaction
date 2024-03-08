package com.bank.dao;

import com.bank.dao.mapper.TransactionMapper;
import com.bank.model.Account;
import com.bank.model.Transaction;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.List;

@Repository
public class TransactionDaoImpl implements TransactionDao{
    private final JdbcTemplate jdbcTemplate;

    public TransactionDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Transaction createNewTransaction(Transaction transaction, int accountId) {

        final String sql = "INSERT INTO transactions (transactionType, amount, date) "
            + "VALUES (?, ?, ?);";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update((Connection conn) -> {
            PreparedStatement statement = conn.prepareStatement(
                    sql,
                    Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, transaction.getTransactionType());
            statement.setBigDecimal(2, transaction.getAmount());
            statement.setTimestamp(3, Timestamp.valueOf(transaction.getDate()));
            return statement;
        }, keyHolder);
        // Creates a transaction ID.
        transaction.setTransactionId(keyHolder.getKey().intValue());

        // Update transactions for a specific accountId
        int transactionId = keyHolder.getKey().intValue();

        final String insertAccountTransactionSql = "INSERT INTO accounts_transactions (accountId, transactionId) "
                + "VALUES (?, ?);";

        jdbcTemplate.update((Connection conn) -> {
            PreparedStatement statement = conn.prepareStatement(insertAccountTransactionSql);
            statement.setInt(1, accountId);
            statement.setInt(2, transactionId);
            return statement;
        });

        return transaction;
    }

    @Override
    public List<Transaction> getAllTransactionWithAccountId(int id) {
        final String sql = "SELECT * FROM transactions " +
                "JOIN accounts_transactions ON accounts_transactions.transactionId = transactions.transactionID " +
                "WHERE accounts_transactions.accountId = ?;";
        return jdbcTemplate.query(sql, new TransactionMapper(), id);
    }

    @Override
    public List<Transaction> getAllTransaction() {

        final String sql = "SELECT * FROM transactions;";
        return jdbcTemplate.query(sql, new TransactionMapper());

    }

    @Override
    public Transaction findTransactionById(int id) {

        final String sql = "SELECT * FROM transactions "
                + "WHERE transactionId = ?;";
        return jdbcTemplate.queryForObject(sql, new TransactionMapper(), id);

    }

}
