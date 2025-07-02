import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { type MaterialResponse } from '../models/materials/material-response.model';
import { type MaterialRequest } from '../models/materials/material-request.model';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private apiUrl = `${environment.apiBaseUrl}/materials`;

  constructor(private http: HttpClient) {}

  searchMaterials(
    type?: string,
    cityCode?: string,
    purchaseDate?: string
  ): Observable<MaterialResponse[]> {

    let params = new HttpParams();
    if (type) params = params.set('type', type);
    if (cityCode) params = params.set('cityCode', cityCode);
    if (purchaseDate) params = params.set('purchaseDate', purchaseDate);

    return this.http.get<MaterialResponse[]>(`${this.apiUrl}`, {
      params,
    });
  }

  getMaterialById(id: number): Observable<MaterialResponse> {
    return this.http.get<MaterialResponse>(`${this.apiUrl}/${id}`);
  }

  createMaterial(material: MaterialRequest): Observable<MaterialResponse> {
    return this.http.post<MaterialResponse>(`${this.apiUrl}`, material);
  }

  updateMaterial(materialId: number, material: MaterialRequest): Observable<MaterialResponse> {
    return this.http.put<MaterialResponse>(`${this.apiUrl}/${materialId}`, material);
  }

  deleteMaterial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
