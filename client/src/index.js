import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from '@emotion/react';
import { Box, createTheme } from '@mui/material';
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height:'50px',
        
        },
        '&:hover': {
          backgroundColor: 'secondary.light !important'
        }
      },
      
    },
  },
  typography: {
    fontFamily: [
      'DM Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main:'#1A191E',
      bluish:'#215190'
    },
    secondary:{
      main:'#C4B28F',
      dark:'#b0a080',
      light:"#D5C9B0",
    },
    background: {
      default: "#F1F3F4"
    },
    // secondary: purple,
  },

});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
       <App />
    </ThemeProvider>
  </React.StrictMode>,
)
