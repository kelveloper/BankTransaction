import React from 'react';
import { Typography, Button, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Home = () => {
  const [transactionData, setTransactionsData] = useState([]);
  const [accountData, setAccountData] = useState({});
  const [customerId, setCustomerID] = useState();
  const [customerData, setCustomerData] = useState({});
  useEffect(() => {
    fetch('api/transactions/account/6')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTransactionsData(data);
        console.log('transaction data' + data);
      });
  }, []);

  useEffect(() => {
    fetch('api/accounts/6')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAccountData(data);
        console.log('account data' + data);

      });
  }, []);

  useEffect(() => {
    fetch('api/customers/accounts/6')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCustomerData(data);
        console.log('customer data' + data);

      });
  }, []);

  useEffect(() => {
    fetch('api/customers/accounts/6')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCustomerID(data);
        console.log('customer id' + data);
        fetch(`api/customers/${data}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setCustomerData(data);
          console.log('customer data' + data);
  
        });

      });
  }, []);
  


  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to  {customerData.bankName} {customerData.firstName}
      </Typography>

      {/* Account Overview Section */}
      <Paper style={{ padding: '15px', margin: '20px 0' }}>
        <Typography variant="h6" gutterBottom>
          Account Overview
        </Typography>
        {/* Display summary of accounts, balances, etc. */}
        {/* Replace the content below with actual account data */}
        <Typography variant="body1">
          Total Balance: {accountData.balance}
        </Typography>
        <Typography variant="body2">
          Total Transactions: {transactionData.length}
        </Typography>
        <Link to="/customer/account/6" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
            View Accounts
          </Button>
        </Link>
      </Paper>

      {/* Quick Actions Section */}
      <Grid container spacing={2} style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={6} sm={3}>
          <Link to="/transactionsForAccount" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="primary" fullWidth>
              Transfer Money
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Link to="/singleCustomer" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="primary" fullWidth>
              View Customer Information
            </Button>
          </Link>
        </Grid>
        {/* Add more quick action buttons as needed */}
      </Grid>

      {/* Promotions and Offers Section */}
      <Paper style={{ padding: '15px', margin: '20px 0' }}>
        <Typography variant="h6" gutterBottom>
          Promotions and Offers
        </Typography>
        <Typography variant="body1">
          Take advantage of our limited-time offers and promotions.
        </Typography>
        {/* Add details and links to promotions */}
      </Paper>

      {/* News and Updates Section */}
      <Paper style={{ padding: '15px', margin: '20px 0' }}>
        <Typography variant="h6" gutterBottom>
          News and Updates
        </Typography>
        <Typography variant="body1">
          Stay informed about the latest news and updates from {customerData.bankName}
        </Typography>
        {/* Add news articles or updates */}
      </Paper>

      {/* Additional Sections can be added based on your application's features */}
    </div>
  );
};

export default Home;