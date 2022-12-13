export interface IAutocomplete {
  label: string;
  id: number;
}

export type IOrder = 'asc' | 'desc';

export enum OrderEnum {
  asc = 'asc',
  desc = 'desc',
}
