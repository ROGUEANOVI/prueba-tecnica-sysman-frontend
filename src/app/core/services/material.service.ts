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

  getMaterials(filters?: {
    type?: string;
    cityCode?: string;
    purchaseDate?: string;
  }): Observable<MaterialResponse[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.type) params = params.set('type', filters.type);
      if (filters.cityCode) params = params.set('city', filters.cityCode);
      if (filters.purchaseDate)
        params = params.set('purchaseDate', filters.purchaseDate);
    }

    return this.http.get<MaterialResponse[]>(this.apiUrl, { params, withCredentials: true  });
  }
}
