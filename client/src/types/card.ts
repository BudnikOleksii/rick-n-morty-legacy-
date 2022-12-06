import { Maybe } from './maybe';
import { IUser } from './user';
import { ICharacter } from './character';
import { IResponseInfo } from './response';

export interface ICard {
  id: number;
  owner: Maybe<IUser>;
  character: ICharacter;
}

export interface ICardResponse {
  info?: IResponseInfo;
  results?: ICard[];
  errors?: string;
}
