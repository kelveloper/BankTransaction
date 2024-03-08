package com.bank.dao.mapper;

import com.bank.model.Transaction;
import org.springframework.jdbc.core.RowMapper;


import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class TransactionMapper implements RowMapper<Transaction> {
    @Override
    public Transaction mapRow(ResultSet rs, int rowNum) throws SQLException {
        Transaction transaction = new Transaction();
        transaction.setTransactionId(rs.getInt("transactionId"));
        transaction.setTransactionType(rs.getString("transactionType"));
        transaction.setAmount(rs.getBigDecimal("amount"));
        if (rs.getTimestamp("date") != null) {
            transaction.setDate(rs.getTimestamp("date").toLocalDateTime());
        }
        return transaction;
    }
}
