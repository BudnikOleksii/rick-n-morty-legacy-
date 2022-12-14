import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import { GridItem } from '../../atoms/GridItem';
import { LotCard } from '../LotCard';
import { ILot } from '../../../types/lot';

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
