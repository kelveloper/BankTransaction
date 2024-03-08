import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import {useState, useEffect} from "react"
import Donut from "../component/Donut"

function Bank() {
  const [bankData, setBankData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [bankBoolean, setBankBoolean] = useState(true);
  const [customerBoolean, setCustomerBoolean] = useState(false);
  const [accountData, setAccountData] = useState([]);
  const [accountBoolean, setAccountBoolean] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [transactionBoolean, setTransactionBoolean] = useState(false);
  const [bankName, setBankName] = useState("");
  const [selectedBankCustomers, setSelectedBankCustomers] = useState(0);
  const [otherBankCustomers, setOtherBankCustomers] = useState(0);
  const [withdraw, setWithdraw] = useState(0);
  const [deposit, setDeposit] = useState(0);

  const [balances, setBalances] = useState([]);

  useEffect(() => {
    fetch('api/banks')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //console.log(data);
        setBankData(data);
      });
  }, []);

  async function getCustomers(id, name) {
    setBankBoolean(false)
    setCustomerBoolean(true)
    setBankName(name)
    fetch('api/banks/customers/' + id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCustomerData(data);
      });
    
    fetch('api/banks/customers/count')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setOtherBankCustomers(data);
      });
    
    fetch('api/banks/customers/count/' + id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSelectedBankCustomers(data);
      });
  }

  async function getAccounts(id) {
    setCustomerBoolean(false)
    setAccountBoolean(true)
    fetch('api/accounts/customer/' + id)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //console.log(data);
      setAccountData(data);
      setBalances(data.map(({ accountId, balance }) => [accountId, balance]))
    })
  }
  async function getTransactions(id) {
    setAccountBoolean(false)
    setTransactionBoolean(true)
    fetch('api/transactions/account/' + id)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //console.log(data);
      setTransactionData(data);
    })
    fetch('api/banks/deposit/' + id)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //console.log(data);
      setDeposit(data);
    })
    fetch('api/banks/withdraw/' + id)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //console.log(data);
      setWithdraw(data);
    })
  }

  function goBackBank() {
    setBankBoolean(true)
    setCustomerBoolean(false)
  }

  function goBackCustomer() {
    setCustomerBoolean(true)
    setAccountBoolean(false)
  }

  function goBackAccount() {
    setAccountBoolean(true)
    setTransactionBoolean(false)
  }
  
    return (
      <div className="Bank">
        <div className = {bankBoolean ? "visible" : "hidden"}>
          <TableContainer component={Paper} className="bg-white shadow-md rounded my-6">
            <Table sx={{ minWidth: 650 }} aria-label="simple table" className="min-w-full">

              <TableHead className="bg-gray-300 text-white">

                <TableRow>
                  <TableCell >Bank ID</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Address</TableCell>
                  <TableCell align="center">Customer List</TableCell>


                </TableRow>
              </TableHead>
              <TableBody>

                {bankData.map((bank) => (

                  <TableRow
                  key={bank.bankId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {bank.bankId}
                    </TableCell>
                    <TableCell align="left">{bank.name}</TableCell>
                    <TableCell align="left">{bank.address}</TableCell>
                    <TableCell align="center">
                      <Button variant="outlined" color="secondary"  onClick= {() => getCustomers(bank.bankId, bank.name)}>
                        Get Customer List
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className = {customerBoolean ? "visible" : "hidden"}>
        <TableContainer component={Paper} className="bg-white shadow-md rounded my-6">
            <Table sx={{ minWidth: 650 }} aria-label="simple table" className="min-w-full">

              <TableHead className="bg-gray-300 text-white">

              <TableRow>
                <TableCell >Customer Id</TableCell>
                <TableCell align="left">First Name</TableCell>
                <TableCell align="left">Last Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Phone Number</TableCell>
                <TableCell align="left">Bank Pin</TableCell>
                <TableCell align="center">Account List</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>

                {customerData.map((customer) => (
                  <TableRow
                    key={customer.customerId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      
                  >
                    <TableCell component="th" scope="row">
                      {customer.customerId}
                    </TableCell>
                    <TableCell align="left">{customer.firstName}</TableCell>
                    <TableCell align="left">{customer.lastName}</TableCell>
                    <TableCell align="left">{customer.email}</TableCell>
                    <TableCell align="left">{customer.phoneNumber}</TableCell>
                    <TableCell align="left">{customer.bankPin}</TableCell>
                    <TableCell align="center">
                      <Button variant="outlined" color="secondary"  onClick= {() => getAccounts(customer.customerId)}>
                        Get Account List
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="outlined" color="primary"  onClick={() => goBackBank()}>
              Go Back
          </Button>
          <div className="w-1/2">
            <Donut label = {[bankName, "Other Banks"]} dataset = {[selectedBankCustomers,(otherBankCustomers-selectedBankCustomers)]} labelString = {"# Customers"} titleString = {"Customer List"} />
          </div>
        </div>
        <div className = {accountBoolean ? "visible" : "hidden"}>

          <TableContainer component={Paper} className="bg-white shadow-md rounded my-6">
            <Table sx={{ minWidth: 650 }} aria-label="simple table" className="min-w-full">
              <TableHead className="bg-gray-300 text-white">
                <TableRow>
                  <TableCell >Account Id</TableCell>
                  <TableCell align="left">Balance</TableCell>
                  <TableCell align="left">Account Type</TableCell>
                  <TableCell align="left">Interest Rate</TableCell>
                  <TableCell align="center">Transaction List</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {accountData.map((account) => (

                  <TableRow
                  key={account.accountId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {account.accountId}
                    </TableCell>
                    <TableCell align="left">${account.balance.toFixed(2)}</TableCell>
                    <TableCell align="left">{account.accountType}</TableCell>
                    <TableCell align="left">${account.interestRate.toFixed(2)}</TableCell>
                    <TableCell align="center">
                      <Button variant="outlined" color="secondary" onClick= {() => getTransactions(account.accountId)}>
                          Get Transaction List
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="outlined" color="primary"  onClick={() => goBackCustomer()}>
              Go Back
          </Button>
          <div className="w-1/2">
            <Donut label = {balances.map(x=> "accountID: " + x[0])} dataset = {balances.map(x=>x[1])} labelString = {"$ in Account"} titleString = {"Balance BreakDown"} />
          </div>
        </div>
        <div className={transactionBoolean ? "visible" : "hidden"}>
        <TableContainer component={Paper} className="bg-white shadow-md rounded my-6">
          <Table sx={{ minWidth: 650 }} aria-label="simple table" className="min-w-full">
            <TableHead className="bg-gray-300 text-white">
              <TableRow>
                <TableCell >Transaction Id</TableCell>
                <TableCell align="left">Transaction Type</TableCell>
                <TableCell align="left">Amount</TableCell>
                <TableCell align="left">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {transactionData.map((transaction) => (

                <TableRow
                key={transaction.transactionId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {transaction.transactionId}
                  </TableCell>
                  <TableCell align="left">{transaction.transactionType}</TableCell>
                  <TableCell align="left">${transaction.amount ? transaction.amount.toFixed(2) : ''}</TableCell>
                  <TableCell align="left">{transaction.date}</TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="outlined" color="primary"  onClick={() => goBackAccount()}>
              Go Back
        </Button>
        <div className="w-1/2">
          <Donut label = {["Withdrawals", "Deposits"]} dataset = {[withdraw, deposit]} labelString = {"$ in each transaction"} titleString = {"Transaction BreakDown"} />
        </div>
        </div>
      </div>
    );
  }
  
  export default Bank;