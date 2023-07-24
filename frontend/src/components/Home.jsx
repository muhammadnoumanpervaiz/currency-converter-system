import React from 'react';
import Navbar from '../components/NavBar';
import CountryData from './CountryData';
import { Box } from '@material-ui/core';

const Dashboard = () => {
// parent component in which rendering Navbar and its main component
  return (
    <Box container>
      <Box>
        <Navbar/>
      </Box>
      <Box>
        <CountryData/>
      </Box>
    </Box>
  );
};

export default Dashboard;
