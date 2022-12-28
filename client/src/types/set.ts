import { ICharacter } from './character';
import { ISuccessResponse } from './response';

export interface ISet {
  id: number;
  name: string;
  characters?: Omit<ICharacter, 'location' | 'episodes'>[];
}

export type INewSet = Pick<ISet, 'name'>;

export type ISetsResponse = ISuccessResponse<ISet[]>;
