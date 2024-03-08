import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import EditIcon from '@mui/icons-material/Edit';

import {useNavigate} from 'react-router-dom';
import { FormControl, InputLabel } from '@mui/material';

function SingleCustomer() {
  const [customer, setCustomers] = useState({});
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [validationError, setValidationError] = React.useState(false);
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);

  const initialCustomerState = {
    customerId: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    bankPin: '',
    accounts: []  // Assuming accounts is an array
  };
  const [editCustomer, setEditCustomer] = useState(initialCustomerState);

  const navigate = useNavigate();
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setValidationError(false);
    setIsAddingCustomer(false);
    setIsEditingCustomer(false);
  };

  useEffect(() => {
    getAllCustomers();
  }, []);
  
  async function getAllCustomers() {
    fetch(`api/customers/${6}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error retrieving all customers! status: " + response.status);
        }
        return response.json();
      })
      .then(data => {
        setCustomers(data);
      })
      .catch(error => {
        console.error('Error fetching customer data', error);
      });
  }
  async function handleAdd() {
    setIsAddingCustomer(true);
    setOpenDialog(true);

  }

  async function handleEdit(customer) {
    setIsEditingCustomer(true);
    setEditCustomer(customer);
    setOpenDialog(true);

  }

  async function addNewCustomer() {
    const data = {
      firstName: editCustomer.firstName,
      lastName: editCustomer.lastName,
      email: editCustomer.email,
      phoneNumber: editCustomer.phoneNumber,
      bankPin: editCustomer.bankPin,
      bankName: editCustomer.bankName
    }
    await fetch('api/customers/add', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(() => {
      handleCloseDialog();
      getAllCustomers();
      setEditCustomer(initialCustomerState);
      setValidationError(false);
    })
  }
  async function handleSubmit() {
    if (editCustomer.firstName && editCustomer.lastName && editCustomer.bankName) {
      addNewCustomer();
    }
    else {
      setValidationError(true);
    }
  }
  async function handleEditSubmit() {
    const data = {
      customerId: parseInt(editCustomer.customerId),
      firstName: editCustomer.firstName,
      lastName: editCustomer.lastName,
      email: editCustomer.email,
      phoneNumber: editCustomer.phoneNumber,
      bankPin: editCustomer.bankPin,
      bankName: editCustomer.bankName

    }
    await fetch('api/customers/' + data.customerId, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(() => {
      handleCloseDialog();
      setIsEditingCustomer(false);
      getAllCustomers();
      setValidationError(false);
      setEditCustomer(initialCustomerState);
    })
  }
  async function handleDelete(id) {
    await fetch('api/customers/' + id, {
      method: 'DELETE',
    }).then(() => {
      getAllCustomers();
    })
  }
  async function handleAddAccount(id) {
    navigate('/customer/account/' + id);
    /*
    await fetch('api/customers/' + id, {
      method: 'POST',
    }).then(() => {
      getAllCustomers();
    })
    */

  }
  return (<div className="Customer">



    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle >
        {isAddingCustomer ? 'Add New Customer' : 'Edit Customer'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {isAddingCustomer ? 'Fill in the details to add a new customer' : 'Edit the details for the customer'}
        </DialogContentText>
        {isEditingCustomer &&

          (<TextField
            disabled
            label="Customer Id"
            variant="filled"
            value={isEditingCustomer ? editCustomer.customerId : ''}
            fullWidth
            required
          />)
        }
        <TextField
          label="First Name"
          variant="filled"
          value={ editCustomer.firstName}
          onChange={(e) => setEditCustomer({ ...editCustomer, firstName: e.target.value })}
          // onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Last Name"
          variant="filled"
          value={ editCustomer.lastName}
          onChange={(e) => setEditCustomer({ ...editCustomer, lastName: e.target.value })}
          fullWidth
          required
        />
        <TextField
          label="Email"
          variant="filled"
          value={ editCustomer.email}
          onChange={(e) => setEditCustomer({ ...editCustomer, email: e.target.value })}
          fullWidth
        />
        <TextField
          label="Phone Number"
          variant="filled"
          value={ editCustomer.phoneNumber}
          onChange={(e) => setEditCustomer({ ...editCustomer, phoneNumber: e.target.value })}
          fullWidth
        />
        <TextField
          label="Bank Pin"
          variant="filled"
          value={ editCustomer.bankPin}
          onChange={(e) => setEditCustomer({ ...editCustomer, bankPin: e.target.value })}
          fullWidth
          inputProps={{ maxLength: 4 }}
        />
        {<FormControl fullWidth>
          <InputLabel id="bankLabel">Select Bank</InputLabel>
          <Select
          label="Select Bank"
          variant="filled"
          value={( editCustomer.bankName)}
          onChange={(e) => setEditCustomer({ ...editCustomer, bankName: e.target.value })}
          fullWidth>
            <MenuItem value="Wells Fargo">Wells Fargo</MenuItem>
            <MenuItem value="Bank of America">Bank of America</MenuItem>
            <MenuItem value="JP Morgan Chase">JP Morgan Chase</MenuItem>
            <MenuItem value="CitiBank">CitiBank</MenuItem>
        </Select>
        </FormControl>
        }
        {validationError && (
          <p style={{ color: 'red' }}>Please fill in all required fields.</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="secondary">
          Cancel
        </Button>
        <Button onClick={isAddingCustomer ? handleSubmit : handleEditSubmit} color="primary">
          {isAddingCustomer ? 'Submit' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>

    <TableContainer component={Paper} className="bg-white shadow-md rounded my-6">
      <Table sx={{ minWidth: 650 }} aria-label="simple table" className="min-w-full">

        <TableHead className="bg-gray-300 text-white">

          <TableRow>
            <TableCell >Customer Id</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">Bank Pin</TableCell>
            <TableCell align="right">Accounts</TableCell>
            <TableCell align="right">Bank</TableCell>
            <TableCell align="right">Action</TableCell>
            

          </TableRow>
        </TableHead>
        <TableBody>



            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

            >
              <TableCell component="th" scope="row">
                {customer.customerId}
              </TableCell>
              <TableCell align="right">{customer.firstName}</TableCell>
              <TableCell align="right">{customer.lastName}</TableCell>
              <TableCell align="right">{customer.email}</TableCell>
              <TableCell align="right">{customer.phoneNumber}</TableCell>
              <TableCell align="right">{customer.bankPin}</TableCell>
              <TableCell align="right">
  <ul>
    {customer.accounts && Array.isArray(customer.accounts) ? (
      customer.accounts.map(accountId => (
        <li key={accountId}>
          <Button style={{ margin: '8px', backgroundColor: 'blue' }} size="small" color="primary" variant="contained">{accountId}</Button>
        </li>
      ))
    ) : (
      <li>No accounts available</li>
    )}
  </ul>
</TableCell>
              <TableCell align="right">{customer.bankName}</TableCell>

              <TableCell align="right">
                <Button variant="outlined" color="primary" startIcon={<EditIcon />} onClick={() => handleEdit(customer)}>
                  Edit
                </Button>
                <Button style={{ color: 'red', margin: '8px', bordercolor: 'red' }} variant="outlined" color="secondary" startIcon={<DeleteIcon />} onClick={() => handleDelete(customer.customerId)}>
                  Delete
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => handleAddAccount(customer.customerId)}>
                  Add Account
                </Button>
              </TableCell>
            </TableRow>
          

        </TableBody>
      </Table>
    </TableContainer>



  </div>


  );
}

export default SingleCustomer;