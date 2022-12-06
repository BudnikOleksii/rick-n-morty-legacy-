import { Maybe } from './maybe';
import { IUser } from './user';
import { ICharacter } from './character';
import { IErrorResponse, ISuccessResponse } from './response';

export interface ICard {
  id: number;
  owner: Maybe<IUser>;
  character: ICharacter;
}

export type ICardResponse = ISuccessResponse<ICard[]> | IErrorResponse;
