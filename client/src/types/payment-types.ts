import { Token } from 'react-stripe-checkout';
import { ITransaction } from './transaction';
import { IUser } from './user';

export interface IPaymentData {
  userId: number;
  amount: number;
  token: Token;
}

export interface IPaymentResponse {
  transaction: ITransaction;
  user: IUser;
}
