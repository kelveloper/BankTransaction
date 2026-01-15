import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  InputAdornment,
  IconButton,
  Tooltip,
  Alert,
  CircularProgress
} from '@mui/material';
import { useState, useEffect } from "react";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  PersonAdd as PersonAddIcon,
  AccountBalance as BankIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../config/api';
import { FormControl, InputLabel } from '@mui/material';

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [validationError, setValidationError] = React.useState(false);
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBank, setSelectedBank] = useState('All Banks');

  const initialCustomerState = {
    customerId: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    bankName: '',
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
    setEditCustomer(initialCustomerState);

  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  useEffect(() => {
    // Filter customers based on search term and selected bank
    let filtered = customers.filter(customer => {
      const matchesSearch = 
        customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.customerId.toString().includes(searchTerm);
      
      const matchesBank = selectedBank === 'All Banks' || customer.bankName === selectedBank;
      
      return matchesSearch && matchesBank;
    });
    
    setFilteredCustomers(filtered);
  }, [customers, searchTerm, selectedBank]);
  
  async function getAllCustomers() {
    setLoading(true);
    try {
      const response = await apiCall('api/customers');
      if (!response.ok) {
        throw new Error("Error retrieving all customers! status: " + response.status);
      }
      const data = await response.json();
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (error) {
      console.error('Error fetching customer data', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedBank('All Banks');
  };
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
    await apiCall('api/customers/add', {
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
    await apiCall('api/customers/' + data.customerId, {
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
    await apiCall('api/customers/' + id, {
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
  const bankOptions = ['All Banks', 'Wells Fargo', 'Bank of America', 'JP Morgan Chase', 'CitiBank'];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header Section */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Customer Management
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={3}>
          Manage customer accounts, information, and banking relationships
        </Typography>
        
        {/* Statistics Cards */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary" gutterBottom>
                  {loading ? '...' : customers.length}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Customers
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={2}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="success.main" gutterBottom>
                  {loading ? '...' : filteredCustomers.length}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Filtered Results
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Search and Actions Section */}
        <Card elevation={2} sx={{ p: 3, mb: 3 }}>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} alignItems={{ md: 'center' }} justifyContent="space-between">
            <Box display="flex" gap={2} flexGrow={1} flexDirection={{ xs: 'column', sm: 'row' }}>
              <TextField
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                size="medium"
                sx={{ minWidth: { sm: 300 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setSearchTerm('')} size="small">
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl size="medium" sx={{ minWidth: 180 }}>
                <InputLabel>Filter by Bank</InputLabel>
                <Select
                  value={selectedBank}
                  label="Filter by Bank"
                  onChange={(e) => setSelectedBank(e.target.value)}
                  startAdornment={<BankIcon sx={{ mr: 1, color: 'action.active' }} />}
                >
                  {bankOptions.map((bank) => (
                    <MenuItem key={bank} value={bank}>
                      {bank}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {(searchTerm || selectedBank !== 'All Banks') && (
                <Button onClick={clearSearch} variant="outlined" color="secondary">
                  Clear Filters
                </Button>
              )}
            </Box>
            <Button 
              variant="contained" 
              startIcon={<PersonAddIcon />}
              onClick={handleAdd} 
              size="large"
              sx={{ px: 3 }}
            >
              Add New Customer
            </Button>
          </Box>
        </Card>
      </Box>

      {/* Add/Edit Customer Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          elevation: 8,
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <PersonAddIcon color="primary" />
            <Typography variant="h5" component="span">
              {isAddingCustomer ? 'Add New Customer' : 'Edit Customer'}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {validationError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              Please fill in all required fields (First Name, Last Name, and Bank).
            </Alert>
          )}
          
          <Grid container spacing={3}>
            {isEditingCustomer && (
              <Grid item xs={12}>
                <TextField
                  disabled
                  label="Customer ID"
                  variant="outlined"
                  value={editCustomer.customerId}
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start">#</InputAdornment>,
                  }}
                />
              </Grid>
            )}
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name *"
                variant="outlined"
                value={editCustomer.firstName}
                onChange={(e) => setEditCustomer({ ...editCustomer, firstName: e.target.value })}
                fullWidth
                required
                error={validationError && !editCustomer.firstName}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name *"
                variant="outlined"
                value={editCustomer.lastName}
                onChange={(e) => setEditCustomer({ ...editCustomer, lastName: e.target.value })}
                fullWidth
                required
                error={validationError && !editCustomer.lastName}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                variant="outlined"
                type="email"
                value={editCustomer.email}
                onChange={(e) => setEditCustomer({ ...editCustomer, email: e.target.value })}
                fullWidth
                placeholder="customer@email.com"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                variant="outlined"
                value={editCustomer.phoneNumber}
                onChange={(e) => setEditCustomer({ ...editCustomer, phoneNumber: e.target.value })}
                fullWidth
                placeholder="(555) 123-4567"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                label="Bank PIN *"
                variant="outlined"
                value={editCustomer.bankPin}
                onChange={(e) => setEditCustomer({ ...editCustomer, bankPin: e.target.value })}
                fullWidth
                required
                inputProps={{ maxLength: 4, pattern: '[0-9]{4}' }}
                placeholder="4-digit PIN"
                helperText="4-digit numeric PIN"
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth required error={validationError && !editCustomer.bankName}>
                <InputLabel>Bank Association *</InputLabel>
                <Select
                  label="Bank Association *"
                  value={editCustomer.bankName}
                  onChange={(e) => setEditCustomer({ ...editCustomer, bankName: e.target.value })}
                >
                  <MenuItem value="Wells Fargo">Wells Fargo</MenuItem>
                  <MenuItem value="Bank of America">Bank of America</MenuItem>
                  <MenuItem value="JP Morgan Chase">JP Morgan Chase</MenuItem>
                  <MenuItem value="CitiBank">CitiBank</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button 
            onClick={handleCloseDialog} 
            color="inherit"
            size="large"
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={isAddingCustomer ? handleSubmit : handleEditSubmit} 
            variant="contained"
            size="large"
            startIcon={isAddingCustomer ? <AddIcon /> : <EditIcon />}
          >
            {isAddingCustomer ? 'Add Customer' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Main Content */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Loading customers...
          </Typography>
        </Box>
      ) : (
        <Card elevation={3}>
          <CardContent sx={{ p: 0 }}>
            {filteredCustomers.length === 0 ? (
              <Box p={4} textAlign="center">
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  No customers found
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {customers.length === 0 
                    ? "No customers in the system yet. Add the first customer to get started."
                    : "Try adjusting your search criteria or filters."
                  }
                </Typography>
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Customer Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Contact Info</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Bank PIN</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Accounts</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Bank</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow
                        key={customer.customerId}
                        sx={{ 
                          '&:last-child td, &:last-child th': { border: 0 },
                          '&:hover': { backgroundColor: '#f9f9f9' }
                        }}
                      >
                        <TableCell>
                          <Chip 
                            label={`#${customer.customerId}`} 
                            size="small" 
                            color="primary" 
                            variant="outlined" 
                          />
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body1" fontWeight="medium">
                              {customer.firstName} {customer.lastName}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2">{customer.email}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {customer.phoneNumber}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={customer.bankPin} 
                            size="small" 
                            color="warning" 
                            variant="filled"
                          />
                        </TableCell>
                        <TableCell>
                          <Box display="flex" gap={0.5} flexWrap="wrap">
                            {customer.accounts?.map(accountId => (
                              <Chip
                                key={accountId}
                                label={accountId}
                                size="small"
                                color="success"
                                variant="outlined"
                              />
                            )) || <Typography variant="body2" color="textSecondary">No accounts</Typography>}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={customer.bankName} 
                            size="small" 
                            color="info" 
                            variant="filled"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Box display="flex" gap={0.5} justifyContent="center" flexWrap="wrap">
                            <Tooltip title="Edit Customer">
                              <IconButton 
                                color="primary" 
                                onClick={() => handleEdit(customer)}
                                size="small"
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Customer">
                              <IconButton 
                                color="error" 
                                onClick={() => handleDelete(customer.customerId)}
                                size="small"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                            <Button 
                              variant="outlined" 
                              size="small" 
                              onClick={() => handleAddAccount(customer.customerId)}
                              sx={{ minWidth: 'auto' }}
                            >
                              +Account
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      )}
    </Box>

  );
}

export default Customer;