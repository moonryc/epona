import { Accordion as MuiAccordion , AccordionSummary, Box, Divider, Typography } from "@mui/material";
import { ArrowDownward } from "@mui/icons-material";
import { PropsWithChildren } from "react";

type AccordianProps = {
    title: string;
}

const Accordion = ({title, children}:PropsWithChildren<AccordianProps>) => {

return (
    <MuiAccordion>
      <AccordionSummary expandIcon={<ArrowDownward />}>
        <Typography sx={{ textTransform: 'uppercase' }}>{title}</Typography>
      </AccordionSummary>
      <Divider />
      <Box display="flex" gap={2} m={2}>
        {children}
      </Box>
    </MuiAccordion>
  );
}

export default Accordion;