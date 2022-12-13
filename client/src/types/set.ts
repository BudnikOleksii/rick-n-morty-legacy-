import { ICharacter } from './character';
import { ISuccessResponse } from './response';

export interface ISet {
  id: number;
  name: string;
}

export interface ISetWithCharacters extends ISet {
  characters?: ICharacter[];
}

export type INewSet = Pick<ISet, 'name'>;

export type ISetsResponse = ISuccessResponse<ISetWithCharacters[]>;
