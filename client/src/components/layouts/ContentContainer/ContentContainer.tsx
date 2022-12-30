import React, { FC, ReactNode } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

interface Props {
  children: ReactNode;
}

export const ContentContainer: FC<Props> = ({ children }) => (
  <Box component="main" sx={{ p: 3, width: '100%', maxWidth: '1440px', margin: 'auto' }}>
    <Toolbar />
    {children}
  </Box>
);
