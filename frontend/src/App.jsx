import React from 'react';
import Tabes from './components/Tabes';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import FileUpload from './components/FileUpload';  
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const theme = createTheme({
  palette: {
    primary: {
      main: '#6C63FF',  
    },
    secondary: {
      main: '#FF6584', 
    },
    background: {
      default: '#f3f4f6',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h6: {
      fontWeight: 700,
      color: '#333',
    },
    body1: {
      fontWeight: 400,
      color: '#555',
    },
  },
});


const App = () => {
  return (
    <div className="app bg-dark" style={{minHeight:"100vh"}}>
      <h1 className="text-center text-2xl font-bold mb-4  text-light p-3">Invoice Management App</h1>
      <ThemeProvider theme={theme}>
      {/* wrapper */}
      <FileUpload /> 

      <Tabes />
      </ThemeProvider>
    </div>
  );
};

export default App;
