import React, { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';

interface Props {
  children: ReactNode;
}

export const ContentContainer: FC<Props> = ({ children }) => (
  <Box component="main" sx={{ p: 3, width: '100%', maxWidth: '1440px', margin: 'auto' }}>
    {children}
  </Box>
);
