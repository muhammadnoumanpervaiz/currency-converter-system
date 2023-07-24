import React from 'react';
import MaterialTable from "@material-table/core";
import { Grid } from '@mui/material';
import { currencyTableData } from '../../utils';

const MaterialTableData = ({countries}) => {
// using here material-table to render country detail list
/**
 * It take two arrays as column and data, coloumns belongs to header while date represents data to be render
 */
    return (
        <Grid item xs={12} sx={{padding:"20px", mt:8}}>
        <MaterialTable
          columns={currencyTableData}
          data={countries}
          title= {"Currency Conversion Table"}
          options={{
            sorting: true
          }}
        />
        </Grid>       
    );
}

export default MaterialTableData;