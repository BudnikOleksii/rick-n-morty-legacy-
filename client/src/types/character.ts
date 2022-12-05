import { IEpisode } from './episode';
import { Maybe } from './maybe';

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  gender: string;
  image: string;
  unused: boolean;
  type: string;
  species: string;
  origin: Maybe<Location>;
  location: Maybe<Location>;
  episodes: IEpisode[];
}
