import { FiberManualRecord } from '@mui/icons-material';
import { useEffect } from 'react';
import { useEffectOnce, useToggle } from 'react-use';
import { eponaSocket } from '../../api/socket';

const EponaStatus = () => {
  const [isConnected, toggleConnected] = useToggle(false);

  useEffectOnce(() => {
    eponaSocket.connect();
  })

  useEffect(() => {
    const toggleOn = () => toggleConnected(true);
    const toggleOff = () => toggleConnected(false);
    eponaSocket.on('connect', toggleOn)
    eponaSocket.on('disconnect', toggleOff);
    return () => {
      eponaSocket.off('connect', toggleOn);
      eponaSocket.off('disconnect', toggleOff);
    };
  }, [toggleConnected]);

  const color = isConnected ? 'success' : 'error';

  return (<FiberManualRecord color={color} />);
};

export default EponaStatus;
