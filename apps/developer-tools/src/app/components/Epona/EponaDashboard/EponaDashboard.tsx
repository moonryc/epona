import { Grid2, IconButton, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';
import EponaChat from '../EponaChat/EponaChat';
import { useAllToasts } from '../../../hooks/useAllToasts';
import { useToggle } from 'react-use';
import { Chat, FileOpen, Save } from '@mui/icons-material';

const EponaDashboard = () => {
  const { dummyToast } = useAllToasts();
  // const saveMemoryMutation= useToastMutation()
  // const loadMemoryMutation = useToastMutation()
  const theme = useTheme();
  const [isChatOpen, toggleChat] = useToggle(false);

  const iconButton = {
    bgcolor: theme.palette.secondary.main,
    '&:hover': { backgroundColor: theme.palette.primary.light },
  };

  const buttons = useMemo(() => {
    const buttonSx = {
      fill: theme.palette.primary.main,
    };

    return [
      { icon: <Chat sx={buttonSx} />, name: 'CHAT', action: toggleChat },
      { icon: <Save sx={buttonSx} />, name: 'SAVE MEMORY', action: dummyToast },
      {
        icon: <FileOpen sx={buttonSx} />,
        name: 'LOAD MEMORY',
        action: dummyToast,
      },
    ] as const;
  }, [dummyToast, theme.palette.primary.main, toggleChat]);

  return (
    <Grid2 container spacing={2} m={2}>
      {buttons.map((button) => (
        <Grid2
          size={{ sm: 6, md: 4 }}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          alignContent={'center'}
          justifyContent={'center'}
        >
          <IconButton
            color={'secondary'}
            sx={iconButton}
            onClick={button.action}
          >
            {button.icon}
          </IconButton>
          <Typography>{button.name}</Typography>
        </Grid2>
      ))}
      <EponaChat open={isChatOpen} closeChat={toggleChat} />
    </Grid2>
  );
};

export default EponaDashboard;
