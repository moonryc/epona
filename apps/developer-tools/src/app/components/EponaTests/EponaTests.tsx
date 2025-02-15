import { Button, Stack } from '@mui/material';
import Paper from '../Paper';
import { useToastMutation } from '../../hooks/useToastMutation';
import { useMemo } from 'react';

const EponaTest = () => {
  const healthCheckMutation= useToastMutation()
  const saveMemoryMutation= useToastMutation()
  const loadMemoryMutation = useToastMutation()

  const buttons = useMemo<{name:string, action:()=>void}[]>(()=>{
    return [
      { name: "HEALTH CHECK", action: healthCheckMutation.mutate },
      { name: "SAVE MEMORY", action: saveMemoryMutation.mutate },
      { name: "LOAD MEMORY", action: loadMemoryMutation.mutate },

    ]
  },[healthCheckMutation.mutate, loadMemoryMutation.mutate, saveMemoryMutation.mutate])

  return (
    <Paper title={"Epona Tests"}>
      <Stack spacing={2} m={2}>
        {buttons.map((button) => (<Button key={button.name} variant={"contained"} onClick={()=>button.action()}>{button.name}</Button>))}
      </Stack>
    </Paper>
  );
};

export default EponaTest;
