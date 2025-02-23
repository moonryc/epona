import { AccordionSummary, Box, Button, Divider, Stack, Typography } from "@mui/material"
import { ConversationOwner, useConversationsQuery } from "../../../api/generated/graphql";
import { useToggle } from "react-use";
import CreateEponaConversation from "./CreateEponaConversation";
import { Add, ArrowDownward } from "@mui/icons-material";
import Accordion from "../../Accordion";
import Conversation from "./Conversation";
import { maxBy } from "lodash";

const EponaConversations = () => {
    const [open, toggleOpen] = useToggle(false);
    const { data } = useConversationsQuery({
        variables: { input: { where: { owner: ConversationOwner.Epona } } }
    });
    const conversations = data?.conversations;
    // const lives = maxBy(conversations, (conversation) => conversation);
    return (
        <>
            <Accordion title="Conversations">
                <Box display="flex" width="100%" flexDirection="column" gap={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                    <Box display="flex" justifyContent="flex-end" alignItems="center" p={2}>
                        <Button variant="contained" onClick={toggleOpen} startIcon={<Add />}>CONVERSATION</Button>
                    </Box>
                    </Box>
                    <Stack gap={2}>
                        {conversations?.map((conversation) => (
                            <Conversation key={conversation.id} conversation={conversation} />
                        ))}
                    </Stack>
                </Box>
            </Accordion>
            <CreateEponaConversation open={open} onClose={toggleOpen} />
        </>
    )
}

export default EponaConversations;