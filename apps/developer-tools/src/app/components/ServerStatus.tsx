
import { Box, Paper as MUIPaper, Typography } from '@mui/material';
import Paper from './Paper';

const ServerStatus = () => {

  const isServerAlive = false

  const color = isServerAlive ? 'green' : 'red'
  const text = isServerAlive ? "ONLINE": "OFFLINE"

  return (
    <Paper title={"Server Status"}>
      <Typography variant={"h3"} textAlign={"center"} py={1}>SERVER IS:</Typography>
      <Box display={"flex"} justifyContent={"center"}>
      <MUIPaper variant="elevation" elevation={4} sx={{ mx:4, mb:3, bgcolor: color, px:4, pb:1 }} >
        <Typography textAlign={"center"} variant={"h3"}>{text}</Typography>
      </MUIPaper>
      </Box>
    </Paper>
  );
};

export default ServerStatus;
