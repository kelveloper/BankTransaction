-- Sample data for PostgreSQL - matching DAO expectations with quoted identifiers
-- Banks
INSERT INTO banks (name, address) VALUES
('First National Bank', '123 Main St'),
('Second Community Bank', '456 Oak Ave'),
('Third Regional Bank', '789 Pine St');

-- Customers  
INSERT INTO customers ("firstName", "lastName", email, "phoneNumber", "bankPin") VALUES
('John', 'Doe', 'john.doe@example.com', '555-1234', '1234'),
('Jane', 'Smith', 'jane.smith@example.com', '555-5678', '5678'),
('Mike', 'Johnson', 'mike.johnson@example.com', '555-9012', '9012');

-- Accounts
INSERT INTO accounts (balance, "accountType", "interestRate") VALUES
(2500.00, 'Checking', 0.01),
(15000.00, 'Savings', 0.05),
(1200.50, 'Checking', 0.01),
(8750.25, 'Savings', 0.05);

-- Transactions
INSERT INTO transactions ("transactionType", amount) VALUES
('Deposit', 500.00),
('Withdrawal', 150.00),
('Transfer', 1000.00),
('Deposit', 750.50);

-- Relationship tables  
INSERT INTO customers_accounts ("customerID", "accountId") VALUES
(1, 1), (1, 2), (2, 3), (2, 4);

INSERT INTO accounts_transactions ("accountId", "transactionId") VALUES
(1, 1), (1, 2), (2, 3), (3, 4);

INSERT INTO bank_customers ("customerID", "bankId") VALUES
(1, 1), (2, 1), (3, 2);