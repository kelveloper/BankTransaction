-- PostgreSQL Schema matching DAO expectations
-- Using quoted identifiers for mixed case to match Java DAO queries

-- Drop existing tables in correct order (due to foreign key constraints)
DROP TABLE IF EXISTS bank_customers CASCADE;
DROP TABLE IF EXISTS accounts_transactions CASCADE;
DROP TABLE IF EXISTS customers_accounts CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS banks CASCADE;

CREATE TABLE customers (
    customerid SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    phonenumber VARCHAR(20),
    bankpin VARCHAR(4)
);

CREATE TABLE accounts ( 
    accountid SERIAL PRIMARY KEY,
    balance DECIMAL(10,2),
    accounttype VARCHAR(50),
    interestrate DECIMAL(5,2)
);

CREATE TABLE transactions (
    transactionid SERIAL PRIMARY KEY,
    transactiontype VARCHAR(50),
    amount DECIMAL(10,2),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE banks (
    bankid SERIAL PRIMARY KEY,
    name VARCHAR(100),
    address VARCHAR(255)
);

CREATE TABLE customers_accounts (
    accountid INT,
    customerid INT,
    PRIMARY KEY (accountid, customerid),
    FOREIGN KEY (accountid) REFERENCES accounts(accountid),
    FOREIGN KEY (customerid) REFERENCES customers(customerid)
);

CREATE TABLE accounts_transactions (
    accountid INT,
    transactionid INT,
    PRIMARY KEY (accountid, transactionid),
    FOREIGN KEY (accountid) REFERENCES accounts(accountid),
    FOREIGN KEY (transactionid) REFERENCES transactions(transactionid)
);

-- Note: DAO expects bank_customers (not customers_banks) with customerid (lowercase)
CREATE TABLE bank_customers (
    customerid INT,
    bankid INT,
    PRIMARY KEY (customerid, bankid),
    FOREIGN KEY (customerid) REFERENCES customers(customerid),
    FOREIGN KEY (bankid) REFERENCES banks(bankid)
);