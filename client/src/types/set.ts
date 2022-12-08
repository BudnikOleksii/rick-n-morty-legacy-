import { ICharacter } from './character';
import { ISuccessResponse } from './response';

export interface ISet {
  id: number;
  name: string;
  characters: ICharacter[];
}
export type ISetsResponse = ISuccessResponse<ISet[]>;
