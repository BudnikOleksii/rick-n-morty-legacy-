import { FC } from 'react';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import { ListItemBase } from '../../atoms/ListItemBase';
import { ISet } from '../../../types/set';

interface Props {
  sets: ISet[];
  onToggleCharacterInSet: (setId: number) => void;
}

export const SetsModalList: FC<Props> = ({ sets, onToggleCharacterInSet }) => {
  return (
    <List>
      {sets.map((set) => (
        <ListItemBase key={set.id} text={set.name}>
          <Button variant="outlined" color="success" onClick={() => onToggleCharacterInSet(set.id)}>
            Add
          </Button>
        </ListItemBase>
      ))}
    </List>
  );
};
