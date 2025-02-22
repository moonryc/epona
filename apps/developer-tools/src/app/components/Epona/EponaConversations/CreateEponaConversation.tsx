import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TextField } from "@mui/material";
import { useAllToasts } from "../../../hooks/useAllToasts";
import { useState } from "react";
import { ConversationOwner, namedOperations, useCreateConversationMutation } from "../../../api/generated/graphql";

type CreateEponaConversationProps = {
    open: boolean;
    onClose: () => void;
}

const CreateEponaConversation = ({ open, onClose }: CreateEponaConversationProps) => {
    const { successToast, errorToast } = useAllToasts();

    const [formData, setFormData] = useState({
        name: '',
        prompt: ''
    });

    const [createConversation] = useCreateConversationMutation({
        variables: {
            input: {
                name: formData.name,
                prompt: formData.prompt,
                owner: ConversationOwner.Epona
            }
        },
        onCompleted: () => {
            successToast('Conversation created successfully');
            onClose();
        },
        onError: () => errorToast(),
        refetchQueries: [namedOperations.Query.Conversations],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateConversation = () => createConversation();

    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>Create Epona Conversation</DialogTitle>
            <Divider />
            <DialogContent>
                <Stack gap={2}>
                <TextField
                    label="Conversation Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <TextField
                    multiline
                    rows={10}
                    label="Prompt"
                    name="prompt"
                    value={formData.prompt}
                    onChange={handleInputChange}
                />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={onClose}>Cancel</Button>
                <Button 
                    variant="contained" 
                    onClick={handleCreateConversation}
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateEponaConversation;