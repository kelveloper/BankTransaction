-- Sample data for PostgreSQL - matching DAO expectations with lowercase columns
-- Banks
INSERT INTO banks (name, address) VALUES
('Wells Fargo', '123 Main St'),
('Bank of America', '456 Oak Ave'),
('JP Morgan Chase', '789 Pine St'),
('CitiBank', '101 Wall St');

-- Customers  
INSERT INTO customers (firstname, lastname, email, phonenumber, bankpin) VALUES
('John', 'Doe', 'john.doe@example.com', '555-1234', '1234'),
('Jane', 'Smith', 'jane.smith@example.com', '555-5678', '5678'),
('Mike', 'Johnson', 'mike.johnson@example.com', '555-9012', '9012');

-- Accounts
INSERT INTO accounts (balance, accounttype, interestrate) VALUES
(2500.00, 'Checking', 0.01),
(15000.00, 'Savings', 0.05),
(1200.50, 'Checking', 0.01),
(8750.25, 'Savings', 0.05);

-- Transactions
INSERT INTO transactions (transactiontype, amount) VALUES
('Deposit', 500.00),
('Withdrawal', 150.00),
('Transfer', 1000.00),
('Deposit', 750.50);

-- Relationship tables  
INSERT INTO customers_accounts (customerid, accountid) VALUES
(1, 1), (1, 2), (2, 3), (2, 4);

INSERT INTO bank_customers (bankid, customerid) VALUES
(1, 1), (2, 2), (3, 3);

INSERT INTO accounts_transactions (accountid, transactionid) VALUES
(1, 1), (2, 2), (3, 3), (4, 4);