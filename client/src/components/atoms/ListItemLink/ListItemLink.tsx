import { FC } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { useTranslation } from 'react-i18next';
import { NAME_SPACES } from '../../../constants';

interface Props {
  item: string;
  onClick: (item?: string) => void;
}

export const ListItemLink: FC<Props> = ({ item, onClick }) => {
  const { t } = useTranslation();

  return (
    <ListItem disablePadding>
      <ListItemButton sx={{ textAlign: 'center' }} onClick={() => onClick(item)}>
        <ListItemText primary={t(`paths.${item}`, { ns: NAME_SPACES.main }).toUpperCase()} />
      </ListItemButton>
    </ListItem>
  );
};
