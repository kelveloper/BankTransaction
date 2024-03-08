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
import {FormControl} from '@mui/material';

function TransactionAdd({ onAddTransaction }) {
  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState("");
  const [accountId, setAccountId] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch("api/accounts")
      .then((res) => res.json())
      .then((data) => {
        setAccounts(data);
      });
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setErrors([]);
  };

  const handleAccountChange = (e) => {
    setAccountId(e.target.value);
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

    if (!accountId) {
      newErrors.push("Please select an account ID before adding a transaction.");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = {
      transactionType,
      amount,
    };

    await fetch(`api/add/${accountId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      console.log("Transaction added");
      if (onAddTransaction) {
        onAddTransaction();
      }
      handleCloseDialog();
    });
  };

  return (
    <div className="TransactionAdd">

  <Button variant="contained" onClick={handleOpenDialog} style={{ margin: '8px'}} > Add New Transaction</Button>

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
          <label>
            Select Account ID:
            <Select
              value={accountId}
              onChange={handleAccountChange}
            >
              <MenuItem value={null}></MenuItem>
              {accounts.map((account) => (
                <MenuItem key={account.accountId} value={account.accountId}>
                  {account.accountId}
                </MenuItem>
              ))}
            </Select>
          </label>
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

    </div>
  );
}

export default TransactionAdd;
