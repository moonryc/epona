import { Box, Grid2, Typography } from '@mui/material';
import Epona from './Layout/Epona';
import { ApolloProvider } from './providers/ApolloProvider';

export function App() {
  return (
    <ApolloProvider>
      <Box>
        <Typography textAlign={'center'} variant="h2" mt={10}>
          AI DEVTOOLS
        </Typography>
        <Box display="flex" justifyContent="center">
          <Grid2 container spacing={2} m={4}>
            <Grid2 size={{ xs: 12, sm: 12, md: 2 }} />
            <Grid2 container size={{ xs: 12, sm: 12, md: 8 }}>
              <Epona />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 2 }} />
          </Grid2>
        </Box>
      </Box>
    </ApolloProvider>
  );
}

export default App;
