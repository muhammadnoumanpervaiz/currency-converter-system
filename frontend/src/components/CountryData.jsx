import React, { useState } from 'react';
import { Box, TextField, Button,Typography } from '@mui/material';
import TableData from './sharedComponents/TableData';
import axios from 'axios';

const CountryData = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSearch = () => {
    // Fetch country data by name from the server and attach header to verify token
    axios.get(`http://localhost:5000/api/countryData/country/${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => { 
      const itemAlreadyExist = countries?.find((c)=> c?.country === response?.data?.country);

      if(!itemAlreadyExist){
        setCountries([...countries, response.data]);
      }else(
        alert("This country already exist in your list")
      )

      setSearchTerm('');
    })
    .catch((error) => {
      console.error('Error fetching country data:', error.message);
    });
  };
  
 //function that will convert value from EUR to local currency 
  const handleConvert = () => {
    const newDataArray = countries?.map((c)=> {
      const totalToEur = (amount * c?.perRateToEur).toFixed(2);
      return {
        ...c,
        rateToEUR: totalToEur
      }
    })
    setCountries(newDataArray);
    setAmount(0);
  };
  return (
    <Box>
      <Box sx={{display:"flex", justifyContent:"space-around"}}>

      <Box sx={{ my: 2, display:"flex", flexDirection:"column", justifyContent:"center", rowGap:"10px" }}>
      <Typography variant="h4">Country Lookup</Typography>
        <TextField
          label="Search country by name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
      </Box>
      <Box sx={{ my: 2, display:"flex", flexDirection:"column", justifyContent:"center", rowGap:"10px" }}>
        <Typography variant="h5">Convert Amount to Local Currency</Typography>
        <TextField
          label="Enter amount in EUR"
          variant="outlined"
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <Button variant="contained" color="primary" onClick={handleConvert}>Convert</Button>
      </Box>
      </Box>
      <Box>
        <TableData countries={countries}/>
      </Box>
    </Box>
  );
};

export default CountryData;