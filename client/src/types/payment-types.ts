import { Token } from 'react-stripe-checkout';

export interface IPaymentData {
  userId: number;
  amount: number;
  token: Token;
}
