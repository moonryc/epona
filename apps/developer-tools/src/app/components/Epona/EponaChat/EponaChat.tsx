import Paper from '../../Paper';
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  TextField,
} from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { AttachFile, Send } from '@mui/icons-material';
import ChatMessage, { ChatMessageProps, Participant } from './ChatMessage';
import { useToggle } from 'react-use';
import { useEponaChatStream } from './useEponaChatStream';
import { compact } from 'lodash';

const EponaChat = () => {
  // TODO: add attachments
  // const [attachment, setAttachment] = useState<unknown>();
  const [isEponaChatOpen, toggleEponaChat] = useToggle(false);
  const [userInput, setUserInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessageProps['chat'][]>([]);
  const { response, sendMessage, loading } = useEponaChatStream(userInput);
  const lastAIMessage = useMemo<ChatMessageProps['chat'] | null>(() => {
    if(!response) {
      return null
    }
    return ({
      user: Participant.EPONA,
      message: response ?? '',
      date: new Date(),
    });
  }, [response]);

  const messages = useMemo(()=> lastAIMessage ? [...chatHistory, lastAIMessage] : chatHistory, [chatHistory, lastAIMessage]);

  const handleUserInputOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value),
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const newHistory: ChatMessageProps['chat'][] = compact([
        ...messages,
        { user: Participant.USER, message: userInput, date: new Date() },
      ]);
      sendMessage();
      setUserInput('');
      setChatHistory(newHistory);
    },
    [messages, sendMessage, userInput]
  );

  return (
    <>
      <Button onClick={toggleEponaChat}>EPONA CHAT</Button>
      <Drawer
        title={'Epona Chat'}
        open={isEponaChatOpen}
        anchor={'right'}
        onClose={toggleEponaChat}
      >
        <Paper
          title={'Epona Chat'}
          sx={{
            display: 'flex',
            height: '100vh',
            flexDirection: 'column',
            width: '75vw',
          }}
        >
          <Box width="100%" sx={{ overflowY: 'auto' }} flexGrow={1}>
            {messages.map((chat) => {
              if (!chat) {
                return null;
              }
              return (
                <ChatMessage key={chat.date.getMilliseconds()} chat={chat} />
              );
            })}
          </Box>
          <Box flexGrow={1} />
          <Divider sx={{ m: 2 }} />
          <Box
            m={2}
            gap={2}
            component={'form'}
            display="flex"
            onSubmit={handleSubmit}
            alignContent={'center'}
          >
            <TextField
              fullWidth
              value={userInput}
              onChange={handleUserInputOnChange}
            />
            <IconButton color={'secondary'} disabled>
              <AttachFile />
            </IconButton>
            <IconButton color={'secondary'} type="submit" disabled={loading}>
              <Send />
            </IconButton>
          </Box>
        </Paper>
      </Drawer>
    </>
  );
};

export default EponaChat;
