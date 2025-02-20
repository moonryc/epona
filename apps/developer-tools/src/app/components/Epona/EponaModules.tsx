import Paper from '../Paper';
import { useMemo } from 'react';
import { FormControlLabel, Grid2, Switch } from '@mui/material';

const EponaModules = () => {


  const modules = useMemo(()=>new Array(10).fill(<FormControlLabel control={<Switch defaultChecked />} label="Label" />),[])

  return (
    <Paper title={'Modules'}>
      <Grid2 container spacing={2} m={2}>
        {modules.map((module) => (
          <Grid2 display={"flex"} justifyContent={"center"} size={{ xs: 3 }}>{module}</Grid2>
        ))}
      </Grid2>
    </Paper>
  );
};

export default EponaModules;
