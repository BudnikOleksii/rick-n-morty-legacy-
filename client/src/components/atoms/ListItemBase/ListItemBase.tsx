import { FC, ReactNode } from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

interface Props {
  text: string;
  children?: ReactNode;
}

export const ListItemBase: FC<Props> = ({ text, children }) => (
  <ListItem>
    <ListItemText primary={text} sx={{ marginRight: '15px' }} />
    {children}
  </ListItem>
);
