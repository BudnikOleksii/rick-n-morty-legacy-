import { FC } from 'react';
import List from '@mui/material/List';
import { EpisodeItem } from '../EpisodeItem';
import { IEpisode } from '../../../types/episode';

interface Props {
  episodes: IEpisode[];
}

export const EpisodesList: FC<Props> = ({ episodes }) => {
  return (
    <List>
      {episodes.map((episode) => (
        <EpisodeItem key={episode.id} episode={episode} />
      ))}
    </List>
  );
};
