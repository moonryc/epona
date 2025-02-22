import { Box, Button, Paper, Typography } from "@mui/material";
import { ConversationFragment } from "../../../api/generated/graphql";
import { useEponaConversationId } from "../../../stores/useEponaConversationId";

type ConversationProps = {
    conversation: ConversationFragment;
}

const Conversation = ({conversation}:ConversationProps) => {

    const {conversationId, setConversationId} = useEponaConversationId();
    const isSelected = conversationId === conversation.id;
    const buttonText = isSelected ? "Selected" : "Select";

    const handleClick = () => setConversationId(conversation.id);

    return (
        <Paper sx={{bgcolor: "primary.main", p: 2, borderRadius: 2}}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography>{conversation.name}</Typography>
            {!isSelected && <Button variant="contained" color="secondary" onClick={handleClick}>
                {buttonText}
            </Button>}
            </Box>
        </Paper>
    )
}

export default Conversation;