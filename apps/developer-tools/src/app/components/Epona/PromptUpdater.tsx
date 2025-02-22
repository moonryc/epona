import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';

const PromptUpdater = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDownward />}>
        <Typography>PROMPT UPDATER</Typography>
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
