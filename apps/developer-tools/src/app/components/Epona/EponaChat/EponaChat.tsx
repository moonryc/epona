import { AttachFile, Delete, Send } from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  TextField
} from '@mui/material';
import { compact } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Paper from '../../Paper';
import ChatMessage, { ChatMessageProps, Participant } from './ChatMessage';
import { useEponaChatStream } from './useEponaChatStream';

type EponaChatProps = {
  open: boolean
  closeChat: () => void
}

const EponaChat = ({ open, closeChat }: EponaChatProps) => {
  // TODO: add attachments
  // const [attachment, setAttachment] = useState<unknown>();
  const [userInput, setUserInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessageProps['chat'][]>([]);
  const ref = useRef<HTMLDivElement | null>(null);
  const { response, sendMessage, loading } = useEponaChatStream(userInput);
  const messages = useMemo(() => {
    if (!response) {
      return chatHistory;
    }
    return [...chatHistory, {
      user: Participant.EPONA,
      message: response ?? '',
      date: new Date(),
    }]
  }, [chatHistory, response]);

  const clearMessages = useCallback(() => setChatHistory([]), [])

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

  useEffect(() => {
    if (ref.current) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
      <Drawer
        title={'Epona Chat'}
        open={open}
        anchor={'right'}
        onClose={closeChat}
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
            <div ref={ref} />
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
            <IconButton color={'secondary'} onClick={clearMessages}>
              <Delete />
            </IconButton>
            <IconButton color={'secondary'} disabled>
              <AttachFile />
            </IconButton>
            <IconButton color={'secondary'} type="submit" disabled={loading}>
              <Send />
            </IconButton>
          </Box>
        </Paper>
      </Drawer>
  );
};

export default EponaChat;
