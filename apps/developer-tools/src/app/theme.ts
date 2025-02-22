import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // lighter blue that's more visible in dark mode
      light: '#e3f2fd',
      dark: '#42a5f5',
      contrastText: '#000000',
    },
    secondary: {
      main: '#ce93d8', // standard Material UI purple
      light: '#f3e5f5',
      dark: '#ab47bc',
      contrastText: '#000000',
    },
    background: {
      default: '#121212', // standard Material UI dark background
      paper: '#1e1e1e',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ffb74d',
      light: '#ffd95b',
      dark: '#f57c00',
      contrastText: '#000000',
    },
    info: {
      main: '#29b6f6',
      light: '#4fc3f7',
      dark: '#0288d1',
      contrastText: '#000000',
    },
    success: {
      main: '#66bb6a',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: '#000000',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4, // more standard border radius
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1e1e1e', // consistent paper background
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 1, // slight elevation for better hierarchy
      },
      styleOverrides: {
        root: {
          backgroundColor: '#272727', // slightly lighter than background
        },
      },
    },
    // Add card styling
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#272727',
          borderRadius: 8,
        },
      },
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 4, // more standard border radius
  },
});

export default darkTheme;