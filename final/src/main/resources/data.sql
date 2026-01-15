-- Sample data for PostgreSQL
-- Banks
INSERT INTO Bank (bank_name, routing_number) VALUES
('Chase Bank', '021000021'),
('Bank of America', '011000025'),
('Wells Fargo', '121000248'),
('Citibank', '021000089'),
('US Bank', '091000022');

-- Customers
INSERT INTO Customer (first_name, last_name, date_of_birth, ssn) VALUES
('John', 'Doe', '1985-03-15', '123-45-6789'),
('Jane', 'Smith', '1990-07-22', '987-65-4321'),
('Mike', 'Johnson', '1978-12-10', '555-12-3456'),
('Sarah', 'Williams', '1992-05-08', '777-88-9999'),
('David', 'Brown', '1980-09-25', '111-22-3333');

-- Accounts
INSERT INTO Account (account_type, balance, customer_id, bank_id) VALUES
('Checking', 2500.00, 1, 1),
('Savings', 15000.00, 1, 1),
('Checking', 1200.50, 2, 2),
('Savings', 8750.25, 2, 2),
('Checking', 3300.75, 3, 3),
('Investment', 25000.00, 3, 3),
('Checking', 950.00, 4, 4),
('Savings', 12500.50, 4, 4),
('Checking', 1800.25, 5, 5),
('Savings', 5500.75, 5, 5);

-- Transactions
INSERT INTO Transaction (transaction_type, amount, transaction_date, description, account_id) VALUES
('Deposit', 500.00, '2024-01-15', 'Payroll Deposit', 1),
('Withdrawal', 150.00, '2024-01-16', 'ATM Withdrawal', 1),
('Transfer', 1000.00, '2024-01-17', 'Transfer to Savings', 2),
('Deposit', 750.50, '2024-01-18', 'Check Deposit', 3),
('Purchase', 45.25, '2024-01-19', 'Grocery Store', 3),
('Deposit', 2000.00, '2024-01-20', 'Bonus Deposit', 4),
('Withdrawal', 200.00, '2024-01-21', 'Cash Withdrawal', 5),
('Transfer', 500.00, '2024-01-22', 'Investment Transfer', 6),
('Deposit', 300.00, '2024-01-23', 'Direct Deposit', 7),
('Purchase', 89.99, '2024-01-24', 'Online Purchase', 8);