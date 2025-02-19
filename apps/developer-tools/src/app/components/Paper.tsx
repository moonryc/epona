import { Card, CardProps, Divider, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

type PaperProps = {
  title: string,
  sx?: CardProps["sx"]
}

const Paper = ({title, children, sx}:PropsWithChildren<PaperProps>) => {
  return (
    <Card elevation={2} sx={{width: '100%', ...sx}}>
      <Typography mx={"2rem"} my={2} variant="h4" component="div">{title}</Typography>
      <Divider />
      {children}
    </Card>
  );
};

export default Paper;
