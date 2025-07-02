export interface MaterialRequest {
  id?: number;
  name: string;
  description?: string;
  type: string;
  price: number;
  purchaseDate: string;
  saleDate?: string | null;
  status: Status;
  cityCode: string;
}

export type Status = 'ACTIVO' | 'DISPONIBLE' | 'ASIGNADO';
