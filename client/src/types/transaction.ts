import { Maybe } from './helper-types';
import { ISuccessResponse } from './response';

export interface ITransaction {
  id: number;
  lot_id: number;
  seller_id: Maybe<number>;
  purchaser_id: number;
  amount: number;
  system_fee: number;
  created_at: string;
}

export type ITransactionResponse = ISuccessResponse<ITransaction[]>;
