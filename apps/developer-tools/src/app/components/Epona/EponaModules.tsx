import { useMemo } from 'react';
import {
  Accordion,
  AccordionSummary,
  Divider,
  FormControlLabel,
  Grid2,
  Switch,
  Typography,
} from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';

const EponaModules = () => {
  const modules = useMemo(
    () =>
      new Array(10).fill(
        <FormControlLabel control={<Switch defaultChecked />} label="Label" />
      ),
    []
  );

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDownward />}>
        <Typography>MODULES</Typography>
      </AccordionSummary>
      <Divider />
      <Grid2 container spacing={2} m={2}>
        {modules.map((module) => (
          <Grid2 display={'flex'} justifyContent={'center'} size={{ xs: 3 }}>
            {module}
          </Grid2>
        ))}
      </Grid2>
    </Accordion>
  );
};

export default EponaModules;
