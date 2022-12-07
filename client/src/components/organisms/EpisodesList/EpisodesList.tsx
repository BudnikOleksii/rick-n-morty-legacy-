import { FC } from 'react';
import List from '@mui/material/List';
import { IEpisode } from '../../../types/episode';
import { EpisodeItem } from '../EpisodeItem';

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
