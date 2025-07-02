import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department } from '../models/location/department.model';
import { City } from '../models/materials/city.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly apiUrl = `${environment.apiBaseUrl}/locations`;

  constructor(private http: HttpClient) {}

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/departments`);
  }

  getAllCities(departmentCode?: string): Observable<City[]> {
    let params = new HttpParams();
    if (departmentCode) {
      params = params.set('departmentCode', departmentCode);
    }

    return this.http.get<City[]>(`${this.apiUrl}/cities`, { params });
  }
}
