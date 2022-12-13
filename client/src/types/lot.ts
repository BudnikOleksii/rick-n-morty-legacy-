import { Maybe } from './maybe';
import { IUser } from './user';
import { ICard } from './card';
import { ISuccessResponse } from './response';

export interface ILot {
  id: number;
  initial_price: number;
  current_price: number;
  start_date: string;
  end_date: string;
  min_action_duration: number;
  max_action_duration: number;
  min_step: number;
  max_price: number;
  lastPersonToBet: Maybe<IUser>;
  card: ICard;
}

export interface INewLot {
  cardId: number;
  initialPrice: number;
  endDate: string;
  minAuctionDuration: number;
  minStep: number;
  maxPrice: number;
}

export type ILotResponse = ISuccessResponse<ILot[]>;
