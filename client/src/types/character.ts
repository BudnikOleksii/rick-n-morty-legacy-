import { Maybe } from './helper-types';
import { IEpisode } from './episode';
import { ILocation } from './location';
import { ISuccessResponse } from './response';
import { ISet } from './set';

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  gender: string;
  image: string;
  unused: boolean;
  type: string;
  species: string;
  origin: Maybe<ILocation>;
  location: Maybe<ILocation>;
  episodes: IEpisode[];
  sets?: ISet[];
}

export type ICharacterBaseInfo = Omit<ICharacter, 'episodes' | 'sets' | 'origin' | 'location'>;

export interface ICharactersResponse extends ISuccessResponse<ICharacterBaseInfo[]> {
  unusedCount: number;
}
