import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider } from '@mui/material';
import darkTheme from './app/theme';
import { ApolloProvider } from './app/providers/ApolloProvider';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ApolloProvider>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </ApolloProvider>
  </StrictMode>
);
