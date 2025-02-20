import { Button, Stack } from '@mui/material';
import Paper from '../../Paper';
import { useToastMutation } from '../../../hooks/useToastMutation';
import { useMemo } from 'react';
import healthCheck from '../../../api/mutation/healthCheck';
import EponaChat from '../EponaChat/EponaChat';
import { useAllToasts } from '../../../hooks/useAllToasts';

const EponaTest = () => {
  const {dummyToast} = useAllToasts()
  // const saveMemoryMutation= useToastMutation()
  // const loadMemoryMutation = useToastMutation()

  const buttons = useMemo<{name:string, action:()=>void}[]>(()=>{
    return [
      { name: "SAVE MEMORY", action:  dummyToast },
      { name: "LOAD MEMORY", action: dummyToast },
    ]
  },[dummyToast])

  return (
    <Paper title={"Epona Tests"}>
      <Stack spacing={2} m={2}>
        <EponaChat/>
        {buttons.map((button) => (<Button key={button.name} variant={"contained"} onClick={()=>button.action()}>{button.name}</Button>))}
      </Stack>
    </Paper>
  );
};

export default EponaTest;
