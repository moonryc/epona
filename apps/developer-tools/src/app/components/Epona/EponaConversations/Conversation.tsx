import { Box, Paper, Typography } from "@mui/material";
import { ConversationFragment } from "../../../api/generated/graphql";

type ConversationProps = {
    conversation: ConversationFragment;
}

const Conversation = ({conversation}:ConversationProps) => {
    return (
        <Paper sx={{bgcolor: "primary.main", p: 2, borderRadius: 2}}>
            <Typography>{conversation.name}</Typography>
        </Paper>
    )
}

export default Conversation;