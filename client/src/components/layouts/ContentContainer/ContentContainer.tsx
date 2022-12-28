import React, { FC, ReactNode } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

interface Props {
  children: ReactNode;
}

export const ContentContainer: FC<Props> = ({ children }) => (
  <Box component="main" sx={{ p: 1, width: '100%' }}>
    <Toolbar />
    {children}
  </Box>
);
