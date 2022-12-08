import { FC } from 'react';
import List from '@mui/material/List';
import { useAppSelector } from '../../../app/hooks';
import { selectSets } from '../../../features/sets/sets-selcetors';
import { ListItemBase } from '../../atoms/ListItemBase';
import Button from '@mui/material/Button';

interface Props {
  onToggleCharacterInSet: (setId: number) => void;
}

export const SetsList: FC<Props> = ({ onToggleCharacterInSet }) => {
  const { sets } = useAppSelector(selectSets);

  return (
    <List>
      {sets &&
        sets.length > 0 &&
        sets.map((set) => (
          <ListItemBase key={set.id} text={set.name}>
            <Button
              variant="outlined"
              color="success"
              onClick={() => onToggleCharacterInSet(set.id)}
            >
              Add to set
            </Button>
          </ListItemBase>
        ))}
    </List>
  );
};
