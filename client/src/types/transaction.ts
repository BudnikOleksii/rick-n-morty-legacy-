import { Maybe } from './maybe';
import { ISuccessResponse } from './response';

export interface ITransaction {
  id: number;
  lot_id: number;
  seller_id: Maybe<number>;
  purchaser_id: number;
  amount: number;
  system_fee: number;
}

export type ITransactionResponse = ISuccessResponse<ITransaction[]>;
