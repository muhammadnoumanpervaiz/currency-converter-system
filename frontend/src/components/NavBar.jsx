import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import {  ExitToApp } from '@material-ui/icons';
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem("token")
      navigate("/");
      window.location.reload();
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
          <Typography variant="h6">Dashboard</Typography>
          <IconButton onClick={handleLogout}>
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
