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
    "customerId" SERIAL PRIMARY KEY,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    "phoneNumber" VARCHAR(20),
    "bankPin" VARCHAR(4)
);

CREATE TABLE accounts ( 
    "accountId" SERIAL PRIMARY KEY,
    balance DECIMAL(10,2),
    "accountType" VARCHAR(50),
    "interestRate" DECIMAL(5,2)
);

CREATE TABLE transactions (
    "transactionID" SERIAL PRIMARY KEY,
    "transactionType" VARCHAR(50),
    amount DECIMAL(10,2),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE banks (
    "bankId" SERIAL PRIMARY KEY,
    name VARCHAR(100),
    address VARCHAR(255)
);

CREATE TABLE customers_accounts (
    "accountId" INT,
    "customerID" INT,
    PRIMARY KEY ("accountId", "customerID"),
    FOREIGN KEY ("accountId") REFERENCES accounts("accountId"),
    FOREIGN KEY ("customerID") REFERENCES customers("customerId")
);

CREATE TABLE accounts_transactions (
    "accountId" INT,
    "transactionId" INT,
    PRIMARY KEY ("accountId", "transactionId"),
    FOREIGN KEY ("accountId") REFERENCES accounts("accountId"),
    FOREIGN KEY ("transactionId") REFERENCES transactions("transactionID")
);

-- Note: DAO expects bank_customers (not customers_banks) with customerID (uppercase ID)
CREATE TABLE bank_customers (
    "customerID" INT,
    "bankId" INT,
    PRIMARY KEY ("customerID", "bankId"),
    FOREIGN KEY ("customerID") REFERENCES customers("customerId"),
    FOREIGN KEY ("bankId") REFERENCES banks("bankId")
);