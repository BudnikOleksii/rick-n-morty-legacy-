import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

interface Props {
  title: string;
}

export const Heading: FC<Props> = ({ title }) => {
  return (
    <>
      <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
        {title}
      </Typography>
      <Divider>{title}</Divider>
    </>
  );
};
