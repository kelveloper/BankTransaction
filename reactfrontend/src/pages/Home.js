import React from 'react';
import { 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  Box,
  Divider,
  Avatar,
  Chip
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  AccountBalance,
  People,
  AccountBalanceWallet,
  SwapHoriz,
  TrendingUp,
  Assessment,
  PersonAdd,
  AddCard
} from '@mui/icons-material';
import { apiCall } from '../config/api';

const Home = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalCustomers: 0,
    totalAccounts: 0,
    totalTransactions: 0,
    totalBanks: 4
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard statistics
    const fetchDashboardData = async () => {
      try {
        // Get all customers count
        const customersResponse = await apiCall('api/customers');
        const customers = await customersResponse.json();
        
        // Get all accounts count  
        const accountsResponse = await apiCall('api/accounts');
        const accounts = await accountsResponse.json();
        
        // Get all transactions count
        const transactionsResponse = await apiCall('api/transactions');
        const transactions = await transactionsResponse.json();

        setDashboardStats({
          totalCustomers: customers.length,
          totalAccounts: accounts.length, 
          totalTransactions: transactions.length,
          totalBanks: 4
        });

        // Get recent transactions (first 5)
        setRecentTransactions(transactions.slice(0, 5));
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  


  const StatCard = ({ title, value, icon: Icon, subtitle }) => (
    <Card elevation={1} sx={{ height: '100%', border: '1px solid #e0e0e0' }}>
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2" sx={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 600 }}>
              {title}
            </Typography>
            <Typography variant="h4" component="h2" sx={{ color: '#2c3e50', fontWeight: 600, mb: 0.5 }}>
              {loading ? '...' : value.toLocaleString()}
            </Typography>
            {subtitle && (
              <Typography color="textSecondary" variant="body2" sx={{ fontSize: '0.875rem' }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box sx={{ 
            backgroundColor: '#f8f9fa', 
            borderRadius: 1, 
            p: 1.5,
            border: '1px solid #e9ecef'
          }}>
            <Icon sx={{ fontSize: 24, color: '#6c757d' }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const QuickActionCard = ({ title, description, icon: Icon, to }) => (
    <Card 
      elevation={0} 
      sx={{ 
        height: '100%', 
        cursor: 'pointer', 
        border: '1px solid #e0e0e0',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        '&:hover': { 
          borderColor: '#495057',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        } 
      }}
    >
      <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardContent sx={{ textAlign: 'center', p: 3 }}>
          <Box sx={{ 
            backgroundColor: '#f8f9fa', 
            borderRadius: 1, 
            p: 2,
            mx: 'auto', 
            mb: 2, 
            width: 56, 
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #e9ecef'
          }}>
            <Icon sx={{ fontSize: 28, color: '#495057' }} />
          </Box>
          <Typography variant="h6" gutterBottom sx={{ color: '#2c3e50', fontWeight: 500 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.875rem' }}>
            {description}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );

  return (
    <Box sx={{ p: 4, backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Header */}
      <Box mb={4} pb={3} borderBottom="1px solid #e0e0e0">
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 500, color: '#2c3e50', mb: 1 }}>
          Banking Management System
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ fontSize: '1rem' }}>
          System overview and quick access to banking operations
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={5}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Customers"
            value={dashboardStats.totalCustomers}
            icon={People}
            subtitle="Active customers"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Accounts"
            value={dashboardStats.totalAccounts}
            icon={AccountBalanceWallet}
            subtitle="All account types"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Transactions"
            value={dashboardStats.totalTransactions}
            icon={SwapHoriz}
            subtitle="Total processed"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Partner Banks"
            value={dashboardStats.totalBanks}
            icon={AccountBalance}
            subtitle="Wells Fargo, BoA, Chase, Citi"
          />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box mb={5}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, mb: 3, color: '#2c3e50' }}>
          Quick Actions
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <QuickActionCard
              title="Manage Customers"
              description="Add, edit, or view customer information"
              icon={People}
              to="/customer"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <QuickActionCard
              title="Account Management"
              description="View and manage customer accounts"
              icon={AccountBalanceWallet}
              to="/account"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <QuickActionCard
              title="Process Transactions"
              description="Handle deposits, withdrawals, transfers"
              icon={SwapHoriz}
              to="/transaction"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <QuickActionCard
              title="Bank Analytics"
              description="View reports and bank statistics"
              icon={Assessment}
              to="/bank"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <TrendingUp sx={{ mr: 1, color: '#6c757d', fontSize: 20 }} />
                <Typography variant="h6" sx={{ fontWeight: 500, color: '#2c3e50' }}>Recent Transactions</Typography>
              </Box>
              <Divider sx={{ mb: 2, borderColor: '#e9ecef' }} />
              {loading ? (
                <Typography>Loading recent transactions...</Typography>
              ) : recentTransactions.length > 0 ? (
                <Box>
                  {recentTransactions.map((transaction, index) => (
                    <Box key={transaction.transactionId} display="flex" justifyContent="space-between" alignItems="center" py={1}>
                      <Box>
        <Typography variant="body1">
                          Transaction #{transaction.transactionId}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {new Date(transaction.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box textAlign="right">
                        <Chip 
                          label={transaction.transactionType}
                          color={transaction.transactionType === 'deposit' ? 'success' : 'warning'}
                          size="small"
                        />
                        <Typography variant="body1" sx={{ mt: 0.5 }}>
                          ${transaction.amount ? transaction.amount.toFixed(2) : '0.00'}
        </Typography>
                      </Box>
                    </Box>
                  ))}
                  <Box mt={2}>
                    <Button component={Link} to="/transaction" variant="outlined" size="small">
                      View All Transactions
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Typography>No recent transactions found.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, color: '#2c3e50' }}>
                System Status
              </Typography>
              <Divider sx={{ mb: 2, borderColor: '#e9ecef' }} />
              <Box mb={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">Database Connection</Typography>
                  <Chip 
                    label="Online" 
                    size="small"
                    sx={{ 
                      backgroundColor: '#e8f5e8',
                      color: '#2e7d32',
                      border: '1px solid #c8e6c9',
                      fontWeight: 500
                    }}
                  />
                </Box>
              </Box>
              <Box mb={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">API Services</Typography>
                  <Chip 
                    label="Active" 
                    size="small"
                    sx={{ 
                      backgroundColor: '#e8f5e8',
                      color: '#2e7d32',
                      border: '1px solid #c8e6c9',
                      fontWeight: 500
                    }}
                  />
                </Box>
              </Box>
              <Box mb={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">Last Backup</Typography>
                  <Typography variant="body2" color="textSecondary">2 hours ago</Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2, borderColor: '#e9ecef' }} />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, color: '#2c3e50' }}>
                Quick Add
              </Typography>
              <Box display="flex" gap={1}>
                <Button 
                  component={Link} 
                  to="/customer" 
                  variant="outlined" 
                  size="small" 
                  startIcon={<PersonAdd />}
                  fullWidth
                  sx={{
                    borderColor: '#6c757d',
                    color: '#495057',
                    '&:hover': {
                      borderColor: '#495057',
                      backgroundColor: '#f8f9fa'
                    }
                  }}
                >
                  New Customer
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;