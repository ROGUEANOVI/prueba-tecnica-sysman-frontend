import { City } from "./city.model";

export interface MaterialResponse {
  id: number;
  name: string;
  type: string;
  quantity: number;
  purchaseDate: string; // formato ISO yyyy-MM-dd
  saleDate?: string | null;
  city: City;
}

