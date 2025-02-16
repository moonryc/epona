import { Box, Grid2, Typography } from '@mui/material';
import EponaTest from './components/EponaTests/EponaTests';
import EponaChat from './components/EponaChat/EponaChat';

export function App() {
  return (
    <Box>
      <Typography textAlign={"center"} variant="h2" m={10}>EPONA DEVTOOLS</Typography>
    <Grid2 container spacing={2} m={4}>
      <Grid2 size={{ xs: 12, sm: 12, md: 2 }} />
      <Grid2 container size={{ xs: 12, sm: 12, md: 8 }}>
          <EponaChat/>
        <Grid2 size={{ xs: 12, sm: 12, md: 6 }} >
          <EponaTest />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 6 }}/>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 12, md: 2 }} />
    </Grid2>
    </Box>
  );
}

export default App;
