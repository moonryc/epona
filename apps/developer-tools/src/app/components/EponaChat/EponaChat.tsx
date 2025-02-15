import Paper from '../Paper';
import { Box, BoxProps, IconButton, TextField, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { AttachFile, Person, Send } from '@mui/icons-material';
import { useAllToasts } from '../../hooks/useAllToasts';

enum Participant {
  EPONA,
  USER,
}

type Chat = {
  user: Participant;
  message: string;
  date: Date
}

const EponaChat = () => {
  const {dummyToast} = useAllToasts()

  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  // TODO: add attachments
  // const [attachment, setAttachment] = useState<unknown>();

  const handleUserInputOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value),[])

  const handleSubmit = useCallback((e:React.FormEvent<HTMLFormElement> )=>{
    e.preventDefault()
    dummyToast()
    const newHistory: Chat[] = [...chatHistory, { user: Participant.USER, message: userInput, date: new Date() }]
    setUserInput("");
    setChatHistory(newHistory);
  },[chatHistory, dummyToast, userInput])

  return (
    <Paper title={"Epona Chat"}>
      <Box height="10rem" width="100%" sx={{overflowY: 'auto'}}>
        {chatHistory.map(chat=>{
          const isUser = chat.user === Participant.USER
          const userIcon =  isUser && <Person/>
          const eponaIcon =  !isUser && <Person/>
          return (
            <Box key={chat.date.getMilliseconds()} display={"flex"} justifyContent={isUser ? "right" : "left"} gap={2}>
              {eponaIcon}
              <Typography>{chat.message}</Typography>
              {userIcon}
            </Box>
          )
        })}
      </Box>
      <Box m={2} gap={2} component={"form"} display="flex" onSubmit={handleSubmit} alignContent={"center"}>
        <TextField fullWidth value={userInput} onChange={handleUserInputOnChange} />
        <IconButton color={"primary"} disabled>
          <AttachFile/>
        </IconButton>
        <IconButton color={"primary"} type="submit">
          <Send/>
        </IconButton>
      </Box>
    </Paper>
  );
};

export default EponaChat;
