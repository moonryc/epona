import {
  FormControlLabel,
  Grid2,
  Switch
} from '@mui/material';
import { useMemo } from 'react';
import Accordion from '../Accordion';


const EponaModules = () => {
  const modules = useMemo(
    () =>["Deep Learning", "Browser Use", "Images", "Emotions"],
    []
  );

  return (
    <Accordion title="modules">
      <Grid2 container spacing={2} m={2}>
        {modules.map((module) => (
          <Grid2 display={'flex'} justifyContent={'center'} size={{ xs: 3 }}>
            <FormControlLabel control={<Switch defaultChecked />} label={module} />
          </Grid2>
        ))}
      </Grid2>
    </Accordion>
  );
};

export default EponaModules;
