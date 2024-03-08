package com.bank.model;

import java.util.List;

public class Customer {
    private int customerId;
    private String firstName;
    private String lastName;
    private String email;
    private List<Integer> accounts;
    private String bankName;
    public int getCustomerId() {
        return customerId;
    }
    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }
    public String getFirstName() {
        return firstName;
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + customerId;
        result = prime * result + ((firstName == null) ? 0 : firstName.hashCode());
        result = prime * result + ((lastName == null) ? 0 : lastName.hashCode());
        result = prime * result + ((email == null) ? 0 : email.hashCode());
        result = prime * result + ((phoneNumber == null) ? 0 : phoneNumber.hashCode());
        result = prime * result + ((bankPin == null) ? 0 : bankPin.hashCode());
        return result;
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Customer other = (Customer) obj;
        if (customerId != other.customerId)
            return false;
        if (firstName == null) {
            if (other.firstName != null)
                return false;
        } else if (!firstName.equals(other.firstName))
            return false;
        if (lastName == null) {
            if (other.lastName != null)
                return false;
        } else if (!lastName.equals(other.lastName))
            return false;
        if (email == null) {
            if (other.email != null)
                return false;
        } else if (!email.equals(other.email))
            return false;
        if (phoneNumber == null) {
            if (other.phoneNumber != null)
                return false;
        } else if (!phoneNumber.equals(other.phoneNumber))
            return false;
        if (bankPin == null) {
            if (other.bankPin != null)
                return false;
        } else if (!bankPin.equals(other.bankPin))
            return false;
        return true;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastname(String lastName) {
        this.lastName = lastName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public String getBankPin() {
        return bankPin;
    }
    public List<Integer> getAccounts(){
        return accounts;
    }
    public void setAccounts(List<Integer> accounts){
        this.accounts = accounts;
    }
    public void setBankPin(String bankPin) {
        this.bankPin = bankPin;
    }
    private String phoneNumber;
    private String bankPin;
    public void setBankName(String bankName){
        this.bankName = bankName;
    }
    public String getBankName(){
        return bankName;
    }
}
