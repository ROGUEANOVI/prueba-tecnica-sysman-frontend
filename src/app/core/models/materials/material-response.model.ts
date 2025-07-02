import { City } from "./city.model";

export interface MaterialResponse {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
  purchaseDate: string;
  saleDate?: string | null;
  status: string;
  city: City;
}


