import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {FormControl} from '@mui/material';


function TransactionID() {
  const { TransactionID } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");
  const [destinationAccount, setDestinationAccount] = useState("");
  const [openTransferDialog, setOpenTransferDialog] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {

      fetch(`http://localhost:3000/api/transactions/account/${TransactionID}`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            //console.log(data)
            setTransactions(data);
        });
  }, [TransactionID]);

  // add transaction

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setErrors([]);
  };

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAddTransaction = async () => {
    const newErrors = [];

    if (!transactionType.trim()) {
      newErrors.push("Please enter a transaction type.");
    }

    if (!amount.trim()) {
      newErrors.push("Please enter an amount.");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }
    if (TransactionID === null) {
      console.error("Invalid TransactionID");
      return;
    }

    const data = {
      transactionType,
      amount,
    };

    await fetch(`http://localhost:3000/api/add/${TransactionID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      console.log("Transaction added");
      handleCloseDialog();
      window.location.reload(); // Reload the page
    });

  };

  // transfer to a new account

  const handleOpenTransferDialog = () => {
    setOpenTransferDialog(true);
  
    // Fetch accounts and update the 'accounts' state
    fetch("http://localhost:3000/api/accounts")
      .then((res) => res.json())
      .then((data) => {
        setAccounts(data);
      });
  };

  const handleCloseTransferDialog = () => {
    setOpenTransferDialog(false);
  };

  const handleTransferAmountChange = (e) => {
    setTransferAmount(e.target.value);
  };

  const handleDestinationAccountChange = (e) => {
    setDestinationAccount(e.target.value);
  };

  const handleTransfer = async () => {
    if (TransactionID === null) {
      console.error("Invalid TransactionID");
      return;
    }

    const data = {
      amount: transferAmount,
      currentAccountId: TransactionID,
      newAccountId: destinationAccount,
    };

    await fetch("http://localhost:3000/api/transfer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      console.log("Transfer completed successfully");
      handleCloseTransferDialog();
      window.location.reload();
    });
  };
  

  return (
    <div className="TransactionID">

<Button variant="contained" onClick={handleOpenDialog} style={{ margin: '8px' }} > Add New Transaction</Button>

<Dialog open={openDialog} onClose={handleCloseDialog}>
  <DialogTitle>Add New Transaction</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Fill in the details to add a new transaction
    </DialogContentText>
    {<FormControl fullWidth>
      <Select
      label="Transaction Type"
      variant="filled"
      value={transactionType}
      onChange={handleTransactionTypeChange}
      fullWidth>
        <MenuItem value="withdrawal">withdrawal</MenuItem>
        <MenuItem value="deposit">deposit</MenuItem>
    </Select>
    </FormControl>
    }
    <TextField
      label="Amount"
      variant="filled"
      value={amount}
      onChange={handleAmountChange}
      fullWidth
      required
    />
      {errors.length > 0 && (
    <div style={{ color: 'red', marginTop: '8px' }}>
      {errors.map((error, index) => (
        <div key={index}>{error}</div>
      ))}
    </div>
  )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDialog} color="secondary">
      Cancel
    </Button>
    <Button onClick={handleAddTransaction} color="primary">
      Add Transaction
    </Button>
  </DialogActions>
</Dialog>

<Button variant="contained" onClick={handleOpenTransferDialog} style={{ margin: '8px' }} > Transfer Money</Button>

      <Dialog open={openTransferDialog} onClose={handleCloseTransferDialog}>
        <DialogTitle>Transfer Money</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details to transfer money
          </DialogContentText>
          <TextField
            label="Transfer Amount"
            variant="filled"
            value={transferAmount}
            onChange={handleTransferAmountChange}
            fullWidth
            required
          />
          <label>
            Destination Account:
            <Select
              value={destinationAccount}
              onChange={handleDestinationAccountChange}
            >
              <MenuItem value={null}>Select Destination Account</MenuItem>
              {accounts.map((account) => (
                <MenuItem key={account.accountId} value={account.accountId}>
                  {account.accountId}
                </MenuItem>
              ))}
            </Select>
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTransferDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleTransfer} color="primary">
            Transfer
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} className="bg-white shadow-md rounded my-6">
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className="min-w-full">
          <TableHead className="bg-gray-300 text-white">
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell align="left">Transaction Type</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.transactionId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{transaction.transactionId}</TableCell>
                <TableCell align="left">{transaction.transactionType}</TableCell>
                <TableCell align="left">{`$${transaction.amount.toFixed(2)}`}</TableCell>
                <TableCell align="left">{transaction.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TransactionID;