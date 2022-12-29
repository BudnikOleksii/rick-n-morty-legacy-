import { ICharacter } from './character';
import { ISuccessResponse } from './response';

export type ICharacterInSet = Omit<ICharacter, 'location' | 'episodes'>;
export interface ISet {
  id: number;
  name: string;
  characters?: ICharacterInSet[];
}

export interface ISetFullInfo extends Omit<ISet, 'characters'> {
  characters: ICharacter[];
}

export type INewSet = Pick<ISet, 'name'>;

export type ISetsResponse = ISuccessResponse<ISet[]>;
