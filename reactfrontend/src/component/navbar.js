import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Typography, 
  Box,
  Avatar,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Dashboard,
  AccountBalance,
  People,
  AccountBalanceWallet,
  SwapHoriz,
  Settings,
  NotificationsNone
} from '@mui/icons-material';

const NavBar = () => {
  const location = useLocation();
  
  const navItems = [
    { label: 'Dashboard', path: '/', icon: Dashboard },
    { label: 'Analytics', path: '/bank', icon: AccountBalance },
    { label: 'Customers', path: '/customer', icon: People },
    { label: 'Accounts', path: '/account', icon: AccountBalanceWallet },
    { label: 'Transactions', path: '/transaction', icon: SwapHoriz },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        color: '#2c3e50'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        {/* Logo/Brand Section */}
        <Box display="flex" alignItems="center">
          <AccountBalance sx={{ mr: 2, fontSize: 28, color: '#6c757d' }} />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 500, 
              color: '#2c3e50',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Banking System
          </Typography>
        </Box>

        {/* Navigation Items */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.path}
                component={RouterLink}
                to={item.path}
                startIcon={<Icon />}
                sx={{
                  mx: 0.5,
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  fontWeight: isActive(item.path) ? 500 : 400,
                  color: isActive(item.path) ? '#2c3e50' : '#6c757d',
                  backgroundColor: isActive(item.path) ? '#f8f9fa' : 'transparent',
                  border: isActive(item.path) ? '1px solid #e9ecef' : '1px solid transparent',
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                    color: '#2c3e50',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' } }}>
                  {item.label}
                </Box>
              </Button>
            );
          })}
        </Box>

        {/* User/System Info Section */}
        <Box display="flex" alignItems="center" gap={1}>
          <Chip 
            label="Online" 
            size="small" 
            sx={{ 
              backgroundColor: '#e8f5e8',
              color: '#2e7d32',
              border: '1px solid #c8e6c9',
              fontWeight: 500,
              display: { xs: 'none', md: 'flex' }
            }} 
          />
          
          <Tooltip title="System Notifications">
            <IconButton size="small" sx={{ color: '#6c757d' }}>
              <NotificationsNone />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Employee: Bank Staff">
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                bgcolor: '#f8f9fa',
                color: '#6c757d',
                fontSize: '0.9rem',
                border: '1px solid #e9ecef'
              }}
            >
              BS
            </Avatar>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;