import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar,  Button } from '@mui/material';

const NavBar = () => {
  return (
    <AppBar position="static">
      
      <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/bank">
          Bank
        </Button>
        <Button color="inherit" component={RouterLink} to="/customer">
          Customer
        </Button>
        <Button color="inherit" component={RouterLink} to="/account">
          Account
        </Button>
        <Button color="inherit" component={RouterLink} to="/transaction">
          Transaction
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;