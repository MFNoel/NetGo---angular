import { Tariff } from './Tariff';

export interface User {
  id: string;
  name: string;
  email: string;
  tariff: Tariff;
}