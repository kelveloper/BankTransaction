DROP DATABASE IF EXISTS bankDB;

CREATE DATABASE bankDB;
USE bankDB;

CREATE TABLE customers (
	customerId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    phoneNumber VARCHAR(20), -- adding dashes, spaces, parenthese?
    bankPin VARCHAR(4)
);

CREATE TABLE accounts ( 
	accountId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    balance DECIMAL(10,2),
    accountType VARCHAR(50), -- (checking, savings)
    interestRate DECIMAL(5,2)
);

CREATE TABLE transactions (
	transactionId INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    transactionType VARCHAR(50), -- (deposit, withdrawal)
    amount DECIMAL(10,2),
    date DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE banks (
	bankId INT AUTO_INCREMENT PRIMARY KEY NOT NUll,
    name VARCHAR(100),
    address VARCHAR(255)
);

CREATE TABLE customers_accounts (
	accountId INT,
    customerID INT,
    PRIMARY KEY (accountId,customerId),
    FOREIGN KEY (accountId)
		REFERENCES accounts(accountId),
	FOREIGN KEY (customerId)
		REFERENCES customers(customerId)
);

CREATE TABLE accounts_transactions (
	accountId INT,
    transactionId INT,
    PRIMARY KEY (accountId,transactionId),
    FOREIGN KEY (accountId)
		REFERENCES accounts(accountId),
	FOREIGN KEY (transactionId)
		REFERENCES transactions(transactionId)
);
    
CREATE TABLE bank_customers (
	customerID INT,
    bankId INT,
    PRIMARY KEY (customerID,bankId),
    FOREIGN KEY (customerID)
		REFERENCES customers(customerID),
	FOREIGN KEY (bankId)
		REFERENCES banks(bankId)
);

insert into banks (bankId, name, address)
values (1, "Wells Fargo", "420 Montgomery Street San Francisco, CA 94104"),
(2, "Bank of America", "Bank of America Corporate Center, 100 North Tryon Street, Charlotte, NC 28255"),
(3, "JP Morgan Chase", "383 Madison Avenue in Midtown Manhattan"),
(4, "CitiBank", "388–390 Greenwich St. New York City, New York, U.S.");

insert into customers (customerId, firstName, lastName, email, phoneNumber, bankPin )
values (1, "Joe ", "Smith", "joesmith@email.com", "555-5555-5555", "5555"), 
(2, "Bobby ", "Baker", "bobbybaker@email.com", "123-4556-8910", "1234"),
(3, "Lily ", "Lee", "lilylee@email.com", "109-8765-4321", "1098"),
(4, "James ", "Jump", "jamesjump@email.com", "111-1111-1111", "1111"),
(5, "Jonah ", "June", "jonahjune@email.com", "222-2222-2222", "2222"),
(6, "Sarah ", "Sue", "sarahsue@email.com", "333-3333-3333", "3333"),
(7, "Who ", "Question", "Question1@email.com", "432-3233-3325", "8737"),
(8, "What ", "Question", "Question2@email.com", "323-3356-3123", "3234"),
(9, "Where ", "Question", "Question3@email.com", "856-3233-8563", "3142"),
(10, "How ", "Question", "Question4@email.com", "333-3333-3333", "3231");

insert into bank_customers (customerID, bankId)
values (1, 1),
(2,2),
(3,3),
(4,4),
(5,4),
(6,4),
(7,3),
(8,2),
(9,1),
(10,1);

insert into accounts (accountId, balance, accountType, interestRate)
values (1, 2, "checkings", 3),
(2, 4, "savings", 5), 
(3, 7, "savings", 5),
(4, 8, "checkings", 6),
(5, 10, "checkings", 7),
(6, 12, "savings", 8),
(7, 12, "savings", 8),
(8, 102, "savings", 8),
(9, 1122, "savings", 8),
(10, 1212, "checkings", 8),
(11, 2012, "savings", 8),
(12, 132, "checkings", 8),
(13, 125, "checkings", 8),
(14, 1, "savings", 8);

insert into customers_accounts(accountId, customerID)
values (1, 1),
(2,2),
(3,3),
(4,4),
(5,5),
(6,6),
(7,6),
(8,6),
(9,1),
(10,1),
(11,2),
(12,3),
(13,4),
(14,6);


insert into transactions(transactionId, transactionType, amount)
values(1, "deposit", 1),
(2, "withdrawal", 1),
(3,  "withdrawal", 1),
(4,  "withdrawal", 1),
(5, "deposit", 1),
(6,  "withdrawal", 1),
(7,  "withdrawal", 2),
(8, "deposit", 3),
(9, "withdrawal", 3),
(10, "deposit", 30),
(11, "withdrawal", 2000000),
(12, "deposit", 12),
(13, "withdrawal", 43);

insert into accounts_transactions(accountId, transactionId)
values (1,1),
(2,2),
(3,3),
(4,4),
(5,5),
(6,6),
(6,7),
(6,8),
(2,9),
(3,10),
(1,11),
(1,12),
(6,13);


