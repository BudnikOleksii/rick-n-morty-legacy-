import { FC } from 'react';
import { ISet } from '../../../types/set';
import List from '@mui/material/List';
import { SetListItem } from '../SetListItem';

interface Props {
  sets: ISet[];
}

export const SetsList: FC<Props> = ({ sets }) => {
  return (
    <List sx={{ maxWidth: 375, margin: 'auto' }}>
      {sets.map((set) => (
        <SetListItem key={set.id} set={set} />
      ))}
    </List>
  );
};
