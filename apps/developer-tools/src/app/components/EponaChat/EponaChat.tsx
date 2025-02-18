import Paper from '../Paper';
import { Box, BoxProps, IconButton, TextField, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { AttachFile, Person, Send } from '@mui/icons-material';
import { useAllToasts } from '../../hooks/useAllToasts';
import { server } from '../../api/apiAdresses';
import { useMutation } from '@tanstack/react-query';
import { eponaChat } from '../../api/mutation/epona.mutations';


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
  // TODO: add attachments
  // const [attachment, setAttachment] = useState<unknown>();
  const [userInput, setUserInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Chat[]>([
    { user: Participant.EPONA, message:"DUMMY MESSAGE", date: new Date() },
  ]);
  // const [lastAIMessage, setLastAIMessage] = useState<Chat | undefined>();
  // const mess = [
  //   ...chatHistory,
  //   lastAIMessage ? { user: Participant.EPONA, message:lastAIMessage, date: new Date() } : undefined
  // ]

  const eponaChatMutation = useMutation({
    mutationFn: eponaChat,
    onSuccess:async a=>{
      const parsed = await a.json()
      console.log(parsed)
      const newMessage:Chat = {
        user: Participant.EPONA, message: parsed.message.content, date: new Date()
      }
      setChatHistory(prev=> [...prev, newMessage]);
    }
  })

  const handleUserInputOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value),[])

  const handleSubmit = useCallback((e:React.FormEvent<HTMLFormElement> )=>{
    e.preventDefault()
    const newHistory: Chat[] = [...chatHistory, { user: Participant.USER, message: userInput, date: new Date() }]
    eponaChatMutation.mutate({message: userInput})
    setUserInput("");
    setChatHistory(newHistory);
  },[chatHistory, eponaChatMutation, userInput])

  return (
    <Paper title={"Epona Chat"}>
      <Box height="20rem" width="100%" sx={{overflowY: 'auto'}}>
        {chatHistory.map(chat=>{
          if(!chat){
            return null
          }
          const isUser = chat.user === Participant.USER
          const userIcon =  isUser && <Person/>;
          const eponaIcon =  !isUser && "🌕"
          const chatBorderRadius = `25px 25px ${isUser ? "0px 25px" : "25px 0px"}`
          const bubbleColor = isUser ? "primary.main" : "secondary.main"
          return (
            <Box key={chat.date.getMilliseconds()} display={"flex"} justifyContent={isUser ? "right" : "left"} gap={1} m={1} alignItems={"end"}>
              {eponaIcon}
              <Typography bgcolor={bubbleColor} py={1} px={3} mb={2} borderRadius={chatBorderRadius}>{chat.message}</Typography>
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
