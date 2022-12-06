import { Maybe } from './maybe';

export interface IResponseInfo {
  total: number;
  next: Maybe<string>;
  prev: Maybe<string>;
  pages: number;
}
