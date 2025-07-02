import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MaterialResponse } from '../models/materials/material-response.model';

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
}
