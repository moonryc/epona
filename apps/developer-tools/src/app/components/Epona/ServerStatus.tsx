import { Box, Button, Paper as MUIPaper, Typography } from '@mui/material';
import Paper from '../Paper';
import { useEffect } from 'react';
import socket from '../../api/socket';
import { useEffectOnce, useToggle } from 'react-use';

const ServerStatus = () => {
  const [isConnected, toggleConnected] = useToggle(false);

  useEffectOnce(()=>{
    socket.connect();
  })

  useEffect(() => {
    const toggleOn = () => toggleConnected(true);
    const toggleOff = () => toggleConnected(false);
    socket.on('connect', toggleOn)
    socket.on('disconnect', toggleOff);
    return () => {
      socket.off('connect', toggleOn);
      socket.off('disconnect', toggleOff);
    };
  }, [toggleConnected]);

  const color = isConnected ? 'green' : 'red';
  const text = isConnected ? 'ONLINE' : 'OFFLINE';

  return (
    <Paper title={'Epona Server'}>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <MUIPaper
          variant="elevation"
          elevation={4}
          sx={{ mx: 15, my: 3, bgcolor: color, px: 4, py: 1 }}
        >
          <Typography textAlign={'center'} variant={'h3'}>
            {text}
          </Typography>
        </MUIPaper>
      </Box>
    </Paper>
  );
};

export default ServerStatus;
