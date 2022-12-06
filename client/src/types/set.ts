import { ICharacter } from './character';
import { IErrorResponse, ISuccessResponse } from './response';

export interface ISet {
  id: number;
  name: string;
  characters: ICharacter[];
}
export type ISetResponse = ISuccessResponse<ISet[]> | IErrorResponse;
