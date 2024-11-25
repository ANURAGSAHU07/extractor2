import React from 'react';
import InvoicesTab from './InvoicesTab';
import ProductsTab from './ProductsTab';
import CustomersTab from './CustomersTab';
import { Tabs, Tab, Box, Paper, Grid } from '@mui/material';
import { Assignment, ShoppingCart, Group } from '@mui/icons-material';

const Tabes = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Grid container justifyContent="center" sx={{ padding: 4 }}>
      <Paper elevation={6} sx={{ width: '100%', maxWidth: 1200, borderRadius: 4, overflow: 'hidden' }}>
        <Box sx={{ background: 'linear-gradient(45deg, #6C63FF, #FF6584)', padding: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleChange}
            variant="fullWidth"
            textColor="inherit"
            TabIndicatorProps={{
              style: { backgroundColor: 'white', height: '4px' },
            }}
          >
            <Tab
              icon={<Assignment />}
              label="Invoices"
              sx={{ fontWeight: 600, color: 'white', '&.Mui-selected': { color: '#FFF' } }}
            />
            <Tab
              icon={<ShoppingCart />}
              label="Products"
              sx={{ fontWeight: 600, color: 'white', '&.Mui-selected': { color: '#FFF' } }}
            />
            <Tab
              icon={<Group />}
              label="Customers"
              sx={{ fontWeight: 600, color: 'white', '&.Mui-selected': { color: '#FFF' } }}
            />
          </Tabs>
        </Box>
        <Box sx={{ padding: 3 }}>
          {activeTab === 0 && <InvoicesTab />}
          {activeTab === 1 && <ProductsTab />}
          {activeTab === 2 && <CustomersTab />}
        </Box>
      </Paper>
    </Grid>
  );
};

export default Tabes;
