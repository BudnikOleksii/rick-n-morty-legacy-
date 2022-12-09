import React, { FC } from 'react';
import { ILot } from '../../../types/lot';
import { GridItem } from '../../atoms/GridItem';
import Grid from '@mui/material/Grid';
import { LotCard } from '../LotCard';

interface Props {
  lots: ILot[];
}

export const LotsList: FC<Props> = ({ lots }) => {
  return (
    <Grid container spacing={2}>
      {lots.map((lot) => (
        <GridItem key={lot.id}>
          <LotCard lot={lot} />
        </GridItem>
      ))}
    </Grid>
  );
};
