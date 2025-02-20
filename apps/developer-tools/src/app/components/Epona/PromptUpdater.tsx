import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  Divider,
  TextField,
} from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';

const PromptUpdater = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDownward />}>
        PROMPT
      </AccordionSummary>
      <Divider />
      <Box display="flex" gap={2} m={2}>
        <TextField multiline fullWidth />
        <Button>Save</Button>
      </Box>
    </Accordion>
  );
};

export default PromptUpdater;
