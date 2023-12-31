import { FC, ReactNode } from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

interface Props {
  name: string;
  value?: string | number;
  icon?: ReactNode;
}

export const ListItemComponent: FC<Props> = ({ name, value = 'Unknown', icon }) => {
  return (
    <ListItem disablePadding>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={`${name}: ${value}`} />
    </ListItem>
  );
};
