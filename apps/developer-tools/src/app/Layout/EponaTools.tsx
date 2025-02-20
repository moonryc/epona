import { Accordion, AccordionSummary, Divider, Grid2 } from '@mui/material';
import EponaTests from '../components/Epona/EponaTests/EponaTests';
import ServerStatus from '../components/Epona/ServerStatus';
import EponaModules from '../components/Epona/EponaModules';
import PromptUpdater from '../components/Epona/PromptUpdater';
import { ArrowDownward } from '@mui/icons-material';

const EponaTools = () => {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ArrowDownward />}>EPONA</AccordionSummary>
      <Divider />
      <Grid2 container spacing={4} p={4}>
        <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
          <EponaTests />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
          <ServerStatus />
        </Grid2>
        <Grid2 size={{xs:12}}>
          <PromptUpdater/>
        </Grid2>
        <Grid2 size={{xs:12}}>
          <EponaModules/>
        </Grid2>
      </Grid2>
    </Accordion>
  );
};

export default EponaTools;
