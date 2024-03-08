// Transfer.js
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function TransactionTransfer() {
  const [amount, setAmount] = useState("");
  const [currentAccount, setCurrentAccount] = useState(null);
  const [newAccount, setNewAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Fetch accounts data and update the 'accounts' state
    fetch("api/accounts")
      .then((res) => res.json())
      .then((data) => {
        setAccounts(data);
      });
  }, []);

  const handleCurrentAccountChange = (e) => {
    setCurrentAccount(e.target.value);
  };

  const handleNewAccountChange = (e) => {
    setNewAccount(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTransfer = async () => {
    const data = {
      amount,
      currentAccountId: currentAccount,
      newAccountId: newAccount,
    };

    await fetch("/api/transfer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      console.log("Transfer completed successfully");
    });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);

  };

  return (
    <div className="Transfer">
       <Button variant="contained" onClick={handleOpenDialog}>Transfer</Button>
       
       <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Transfer Between Accounts</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details to transfer transaction 
          </DialogContentText>
      <label>
        Source Account:
        <Select value={currentAccount} onChange={handleCurrentAccountChange}>
          <MenuItem value={null}>Select Current Account</MenuItem>
          {accounts.map((account) => (
            <MenuItem key={account.accountId} value={account.accountId}>
              {account.accountId}
            </MenuItem>
          ))}
        </Select>
      </label>
      <label>
        Destination Account:
        <Select
          value={newAccount}
          onChange={handleNewAccountChange}
        >
          <MenuItem value={null}>Select New Account</MenuItem>
          {accounts.map((account) => (
            <MenuItem key={account.accountId} value={account.accountId}>
              {account.accountId}
            </MenuItem>
          ))}
        </Select>
      </label>
      <TextField
            label="Amount"
            variant="filled"
            value={amount}
            onChange={handleAmountChange}
            fullWidth
            required
      />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleTransfer} color="primary">
            Transfer
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}

export default TransactionTransfer;
