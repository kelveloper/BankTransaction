-- PostgreSQL Schema for Banking Application
-- Note: PostgreSQL uses SERIAL instead of AUTO_INCREMENT

CREATE TABLE IF NOT EXISTS customers (
    customerid SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    phonenumber VARCHAR(20),
    bankpin VARCHAR(4)
);

CREATE TABLE IF NOT EXISTS accounts ( 
    accountid SERIAL PRIMARY KEY,
    balance DECIMAL(10,2),
    accounttype VARCHAR(50),
    interestrate DECIMAL(5,2)
);

CREATE TABLE IF NOT EXISTS transactions (
    transactionid SERIAL PRIMARY KEY,
    transactiontype VARCHAR(50),
    amount DECIMAL(10,2),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS banks (
    bankid SERIAL PRIMARY KEY,
    name VARCHAR(100),
    address VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS customers_accounts (
    accountid INT,
    customerid INT,
    PRIMARY KEY (accountid, customerid),
    FOREIGN KEY (accountid) REFERENCES accounts(accountid),
    FOREIGN KEY (customerid) REFERENCES customers(customerid)
);

CREATE TABLE IF NOT EXISTS accounts_transactions (
    accountid INT,
    transactionid INT,
    PRIMARY KEY (accountid, transactionid),
    FOREIGN KEY (accountid) REFERENCES accounts(accountid),
    FOREIGN KEY (transactionid) REFERENCES transactions(transactionid)
);

CREATE TABLE IF NOT EXISTS customers_banks (
    customerid INT,
    bankid INT,
    PRIMARY KEY (customerid, bankid),
    FOREIGN KEY (customerid) REFERENCES customers(customerid),
    FOREIGN KEY (bankid) REFERENCES banks(bankid)
);