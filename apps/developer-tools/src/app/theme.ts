// src/theme.ts
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6F4E37', // Rich Coffee Brown
      contrastText: '#F5EBDC', // Light Cream
    },
    secondary: {
      main: '#C8A27C', // Caramel Tone
      contrastText: '#3E2723', // Dark Roast
    },
    background: {
      default: '#2E1B0D', // Dark Espresso
      paper: '#3E2723', // Slightly lighter for contrast
    },
    text: {
      primary: '#F5EBDC', // Creamy Text
      secondary: '#D7CCC8', // Light Mocha
    },
    error: {
      main: '#B71C1C', // Deep Red, like a coffee berry
    },
    warning: {
      main: '#FF9800', // Burnt Orange
    },
    info: {
      main: '#8D6E63', // Cocoa
    },
    success: {
      main: '#4CAF50', // Coffee plant green
    },
  },
  typography: {
    fontFamily: '"Merriweather", serif', // A classic coffee-shop feel
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 500 },
    body1: { fontWeight: 400 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#6F4E37',
          color: '#F5EBDC',
          '&:hover': {
            backgroundColor: '#56392D', // Darker roast shade
          },
        },
      },
    },
  },
});

export default darkTheme;
