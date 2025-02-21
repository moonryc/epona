import { FiberManualRecord } from '@mui/icons-material';
import { useEffect } from 'react';
import { useEffectOnce, useToggle } from 'react-use';
import socket from '../../api/socket';

const EponaStatus = () => {
  const [isConnected, toggleConnected] = useToggle(false);

  useEffectOnce(() => {
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

  const color = isConnected ? 'success' : 'error';

  return (<FiberManualRecord color={color} />);
};

export default EponaStatus;
