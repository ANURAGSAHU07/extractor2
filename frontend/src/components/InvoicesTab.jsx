import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const InvoicesTab = () => {
  const invoices = useSelector((state) => state.data.invoices);

  return (
    <TableContainer
      component={Paper}
      elevation={4}
      sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)', borderRadius: 2 }}
    >
      <Typography variant="h6" sx={{ padding: 2, textAlign: 'center', backgroundColor: '#6C63FF', color: '#FFF' }}>
        Invoices
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Serial Number</strong></TableCell>
            <TableCell><strong>Customer Name</strong></TableCell>
            <TableCell><strong>Product Name</strong></TableCell>
            <TableCell><strong>Quantity</strong></TableCell>
            <TableCell><strong>Tax</strong></TableCell>
            <TableCell><strong>Total Amount</strong></TableCell>
            <TableCell><strong>Date</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.length > 0 ? (
            invoices.map((invoice, index) => (
              <TableRow key={index} hover sx={{ '&:hover': { backgroundColor: '#f1f1f1' } }}>
                <TableCell>{invoice.serialNumber}</TableCell>
                <TableCell>{invoice.customerName}</TableCell>
                <TableCell>{invoice.productname}</TableCell>
                <TableCell>{invoice.quantity}</TableCell>
                <TableCell>{invoice.tax}</TableCell>
                <TableCell>{invoice.totalAmount}</TableCell>
                <TableCell>{invoice.date}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No invoices found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoicesTab;
