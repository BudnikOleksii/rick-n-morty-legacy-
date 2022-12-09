import { ICharacter } from './character';
import { ISuccessResponse } from './response';

export interface ISet {
  id: number;
  name: string;
  characters?: ICharacter[];
}

export type INewSet = Pick<ISet, 'name'>;

export type ISetsResponse = ISuccessResponse<ISet[]>;
