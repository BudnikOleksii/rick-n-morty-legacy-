import React, { FC, ReactNode } from 'react';
import Grid from '@mui/material/Grid';

interface Props {
  children: ReactNode;
}

export const GridItem: FC<Props> = ({ children }) => (
  <Grid item xs={12} sm={6} md={4} lg={3} display="flex" justifyContent="center">
    {children}
  </Grid>
);
