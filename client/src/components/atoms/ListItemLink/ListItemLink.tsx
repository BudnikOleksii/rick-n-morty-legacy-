import { FC } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

interface Props {
  item: string;
  onClick: (item?: string) => void;
}

export const ListItemLink: FC<Props> = ({ item, onClick }) => (
  <ListItem disablePadding>
    <ListItemButton sx={{ textAlign: 'center' }} onClick={() => onClick(item)}>
      <ListItemText primary={item.toUpperCase()} />
    </ListItemButton>
  </ListItem>
);
