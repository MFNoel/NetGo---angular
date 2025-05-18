export interface Tariff {
  id: string;
  name: string;
  internet: string;
  calls: string;
  extra1?: string;
  extra2?: string;
  extra3?: string;
  price: number;
}