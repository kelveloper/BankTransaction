import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import {FormControl} from '@mui/material';
import {useState, useEffect} from "react"
import {useParams} from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from 'react-router-dom';

function AccountID() {
    const [accountData, setAccountData] = useState([]);
    const [accountBalance, setAccountBalance] = useState();
    const [accountType, setAccountType] = useState("savings");
    const [AccountInterestRate, setAccountInterestRate] = useState();
    const [openDialog, setOpenDialog] = useState(false);
    const [isAddingAccount, setIsAddingAccount] = useState(false);
    const [isEditingAccount, setIsEditingAccount] = useState(false);
    const [editAccount, setEditAccount] = useState(null);
    const [validationError, setValidationError] = useState(false);
    const [validationInputError, setvalidationInputError] = useState(false);
    const navigate = useNavigate();
    const handleCloseDialog = () => {
      setOpenDialog(false);
      setValidationError(false);
      setvalidationInputError(false);
      setIsAddingAccount(false);
      setIsEditingAccount(false);
    };

    let { Accountid } = useParams();

    useEffect(() => {
        fetch('http://localhost:3000/api/accounts/customer/' + Accountid)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            //console.log(data)
            setAccountData(data);
          });
      }, [Accountid]);
      async function getAccount() {
        fetch('http://localhost:3000/api/accounts/customer/' + Accountid)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            //console.log(data);
            setAccountData(data);
          });
      }
      async function handleEditSubmitValidation() {
        if(!(/^\d+$/.test(editAccount.balance)) || !(/^\d+$/.test(editAccount.interestRate))) {
          setvalidationInputError(true);
        }
        else {
          handleEditSubmit();
        }
      }


      async function handleEditSubmit() {
        const data = {
          accountId: parseInt(editAccount.accountId),
          balance: editAccount.balance,
          accountType: editAccount.accountType,
          interestRate: editAccount.interestRate}
          await fetch('http://localhost:3000/api/accounts/update', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          }).then(() => {
            getAccount();
            handleCloseDialog();
            setIsEditingAccount(false);
            setAccountBalance('');
            setAccountType('savings');
            setAccountInterestRate('');
            setValidationError(false);
            setvalidationInputError(false);
            setEditAccount(null);
          })

      }
      function handleEdit(account) {
        setIsEditingAccount(true);
        setEditAccount(account);
        setOpenDialog(true);
      }

      async function handleAddAccountValidation() {
        if(!(/^\d+$/.test(accountBalance)) || !(/^\d+$/.test(AccountInterestRate))) {
          setvalidationInputError(true);
        }
        else {
          addAccount();
        }
      }


      const addAccount = async () => {
    
        const data = {balance: accountBalance,
          accountType: accountType,
          interestRate: AccountInterestRate};
        
        await fetch('http://localhost:3000/api/accounts/add/' + Accountid, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }).then(() => {
          getAccount();
          handleCloseDialog();
          setIsEditingAccount(false);
          setAccountBalance('');
          setAccountType('savings');
          setAccountInterestRate('');
          setValidationError(false);
          setvalidationInputError(false);
          setEditAccount(null);
        })
      }
    
    
      async function deleteAccount(id) {
        await fetch('http://localhost:3000/api/accounts/delete/' + id, { method: 'DELETE' });
        getAccount();
      }

      async function handleAdd() {
        setIsAddingAccount(true);
        setOpenDialog(true);
      }
      async function handleAddTransaction(id) {
        navigate('/customer/account/transaction/' + id);
      }
    
      return (
        <div className="Account">
          <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} onClick={handleAdd}
          style={{ margin: '8px', borderColor: 'green' , color: 'green'}}>Add a Account</Button>


          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle >
              {isAddingAccount ? 'Add New Account' : 'Edit Account'}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {isAddingAccount ? 'Fill in the details to add a new Account' : 'Edit the details for the Account'}
              </DialogContentText>
              {isEditingAccount &&
                (<TextField
                  disabled
                  label="Account Id"
                  variant="filled"
                  value={isEditingAccount ? editAccount.accountId : ''}
                  fullWidth
                  required
                />)
              }
              <TextField
                label="balance"
                variant="filled"
                value={isEditingAccount ? editAccount.balance : accountBalance}
                onChange={(e) =>  isEditingAccount ? setEditAccount({ ...editAccount, balance: e.target.value }) : setAccountBalance(e.target.value)}
                fullWidth
              />
              <TextField
                label="Interest Rate"
                variant="filled"
                value={isEditingAccount ? editAccount.interestRate : AccountInterestRate}
                onChange={(e) => isEditingAccount ? setEditAccount({ ...editAccount, interestRate: e.target.value }) : setAccountInterestRate(e.target.value)}
                fullWidth
              />
              {<FormControl fullWidth>
                <Select
                label="Select Account Type"
                variant="filled"
                value={ isEditingAccount ? editAccount.accountType : accountType}
                onChange={(e) => isEditingAccount ? setEditAccount({ ...editAccount, accountType: e.target.value }) : setAccountType(e.target.value)}
                fullWidth>
                  <MenuItem value="savings">savings</MenuItem>
                  <MenuItem value="checkings">checkings</MenuItem>
              </Select>
              </FormControl>
              }
              {validationError && (
                <p style={{ color: 'red' }}>Please fill in all required fields.</p>
              )}
              {validationInputError && (
                <p style={{ color: 'red' }}>Please have valid inputs.</p>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="secondary">
                Cancel
              </Button>
              <Button onClick={isAddingAccount ? handleAddAccountValidation : handleEditSubmitValidation} color="primary">
                {isAddingAccount ? 'Submit' : 'Save Changes'}
              </Button>
            </DialogActions>
          </Dialog>


          <TableContainer component={Paper} className="bg-white shadow-md rounded my-6">
            <Table sx={{ minWidth: 650 }} aria-label="simple table" className="min-w-full">

              <TableHead className="bg-gray-300 text-white">

                <TableRow>
                  <TableCell >Account Id</TableCell>
                  <TableCell align="left">Balance</TableCell>
                  <TableCell align="left">Account Type</TableCell>
                  <TableCell align="left">Interest Rate</TableCell>
                  <TableCell align="center">Action</TableCell>


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
                    <TableCell align="left">{account.interestRate.toFixed(2)}%</TableCell>
                    <TableCell align="center">
                      <Button variant="outlined" color="primary" startIcon={<EditIcon />} onClick={() => handleEdit(account)}>
                        Edit
                      </Button>
                      <Button style={{ color: 'red', margin: '8px', bordercolor: 'red' }} variant="outlined" color="secondary" startIcon={<DeleteIcon />} onClick={() => deleteAccount(account.accountId)}>
                        Delete
                      </Button>
                      <Button variant="outlined" color="secondary" onClick={ () => handleAddTransaction(account.accountId)}>
                        Add Transaction
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
}
export default AccountID;