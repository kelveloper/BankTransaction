package com.bank.model;

import java.util.Objects;

public class Account {
    private int accountId;
    private double balance;
    private String accountType;
    private double interestRate;


    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(double interestRate) {
        this.interestRate = interestRate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Account account)) return false;
        return getAccountId() == account.getAccountId() && Double.compare(getBalance(), account.getBalance()) == 0 && Double.compare(getInterestRate(), account.getInterestRate()) == 0 && Objects.equals(getAccountType(), account.getAccountType());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getAccountId(), getBalance(), getAccountType(), getInterestRate());
    }
}
