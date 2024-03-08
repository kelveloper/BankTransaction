import { TableBody, TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';


function TransactionList() {
    const [transactionData, setTransactionsData] = useState([]);


    useEffect(() => {
      fetch('api/transactions')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          //console.log(data);
          setTransactionsData(data);
        });
    });
 
    return (
        <div className="TransactionList">
           
      <TableContainer component={Paper} className="bg-white shadow-md rounded my-6">
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className="min-w-full">
          <TableHead className="bg-gray-300 text-white">


            <TableRow>
              <TableCell>Transaction Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>  


          </TableHead>


          <TableBody>


            {transactionData.map((transaction) => (
              <TableRow
              key={transactionData.transactionId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">{transaction.transactionType}</TableCell>
                <TableCell align="left">{`$${transaction.amount.toFixed(2)}`}</TableCell>                <TableCell align="left">{transaction.date}</TableCell>
              </TableRow>
            ))}


          </TableBody>
        </Table>
      </TableContainer>
    

        </div>
      );


}


export default TransactionList;



