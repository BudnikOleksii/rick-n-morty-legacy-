import { FC, ReactNode } from 'react';
import CardActions from '@mui/material/CardActions';

interface Props {
  children: ReactNode;
}

export const CardButtonsWrapper: FC<Props> = ({ children }) => (
  <CardActions
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    }}
    disableSpacing
  >
    {children}
  </CardActions>
);
