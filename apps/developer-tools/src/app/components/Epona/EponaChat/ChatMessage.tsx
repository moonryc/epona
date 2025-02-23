import { Person } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

export enum Participant {
  EPONA,
  USER,
}

type Chat = {
  user: Participant;
  message: string;
  date: Date
}

export type ChatMessageProps = {
  chat: Chat
}

const ChatMessage = ({chat}:ChatMessageProps) => {
  const isUser = chat.user === Participant.USER
  const userIcon =  isUser && <Person/>;
  const eponaIcon =  !isUser && "🌕"
  const chatBorderRadius = `25px 25px ${isUser ? "0px 25px" : "25px 0px"}`
  const bubbleColor = isUser ? "primary.main" : "secondary.main"
  // const color = isUser ? "secondary.main" : "black"
  return (
    <Box display={"flex"} justifyContent={isUser ? "right" : "left"} gap={1} m={1} alignItems={"end"}>
      {eponaIcon}
      <Typography color={"black"} bgcolor={bubbleColor} fontWeight={"bolder"} py={1} px={3} mb={2} borderRadius={chatBorderRadius}>{chat.message}</Typography>
      {userIcon}
    </Box>
  )
};

export default ChatMessage;
