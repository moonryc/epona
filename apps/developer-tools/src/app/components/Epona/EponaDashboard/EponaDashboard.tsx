import { Grid2, IconButton, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';
import EponaChat from '../EponaChat/EponaChat';
import { useAllToasts } from '../../../hooks/useAllToasts';
import { useToggle } from 'react-use';
import { Chat, FileOpen, Save } from '@mui/icons-material';
import { useLoadEponaMemoryMutation, useSaveEponaMemoryMutation } from '../../../api/generated/graphql';
import { useEponaConversationId } from '../../../stores/useEponaConversationId';
import { isNil } from 'lodash';

const EponaDashboard = () => {
  const theme = useTheme();
  const { successToast, errorToast } = useAllToasts();
  const {conversationId} = useEponaConversationId();
  const isConversationSelected = !isNil(conversationId);

  const [saveEponaMemoryMutation, {loading: saveEponaMemoryLoading}] = useSaveEponaMemoryMutation({
    variables: {
      input: {
        conversationId: conversationId || '1',
      }
    },
    onCompleted: (data) => {
      if(!data.saveEponaMemory.success){
        errorToast(data.saveEponaMemory.message);
        return;
      }
      successToast('Memory saved');
    },
    onError: () => {
      errorToast('Error saving memory');
    },
  })

  const [loadEponaMemoryMutation, {loading: loadEponaMemoryLoading}] = useLoadEponaMemoryMutation({
    variables: {
      input: {
        conversationId: conversationId || '1',
      }
    },
    onCompleted: (data) => {
      if(!data.loadEponaMemory.success){
        errorToast(data.loadEponaMemory.message);
      }
      successToast('Memory loaded');
    },
    onError: () => {
      errorToast('Error loading memory');
    },
  })
  
  const [isChatOpen, toggleChat] = useToggle(false);

  const buttons = useMemo(() => {
    const buttonSx = {
      fill: theme.palette.secondary.main,
    };

    return [
      { icon: <Chat sx={buttonSx} />, name: 'CHAT', action: toggleChat, disabled: false },
      { icon: <Save sx={buttonSx} />, name: 'SAVE MEMORY', action: saveEponaMemoryMutation, disabled: saveEponaMemoryLoading || !isConversationSelected },
      {
        icon: <FileOpen sx={buttonSx} />,
        name: 'LOAD MEMORY',
        action: loadEponaMemoryMutation,
        disabled: loadEponaMemoryLoading || !isConversationSelected
      },
    ] as const;
  }, [isConversationSelected, loadEponaMemoryLoading, loadEponaMemoryMutation, saveEponaMemoryLoading, saveEponaMemoryMutation, theme.palette.secondary.main, toggleChat]);

  return (
    <Grid2 container spacing={2} m={2}>
      {buttons.map((button) => (
        <Grid2
          size={{ xs:6, sm: 6, md: 4 }}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          alignContent={'center'}
          justifyContent={'center'}
        >
          <IconButton
            color={'secondary'}
            onClick={button.action}
            disabled={button.disabled}
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
