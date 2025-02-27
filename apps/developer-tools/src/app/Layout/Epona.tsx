import { ArrowDownward } from '@mui/icons-material';
import { Accordion, AccordionSummary, Box, Divider, Grid2, Typography } from '@mui/material';
import EponaConversations from '../components/Epona/EponaConversations/EponaConversations';
import EponaDashoard from '../components/Epona/EponaDashboard/EponaDashboard';
import EponaModules from '../components/Epona/EponaModules';
import EponaStatus from '../components/Epona/ServerStatus';
import EponaChatExample from '../components/EponaChatExample';

const Epona = () => {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ArrowDownward />}>
        <Box display="flex" alignItems="center" gap={1}>
          <EponaStatus />
          <Typography variant="h6">EPONA</Typography>
        </Box>
      </AccordionSummary>
      <Divider />
      <Grid2 container spacing={4} p={4}>
        <Grid2 size={{ xs: 12 }}>
          <EponaDashoard />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <EponaConversations />
          <EponaModules />
          <EponaChatExample/>
        </Grid2>
      </Grid2>
    </Accordion>
  );
};

export default Epona;
