import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Department } from 'src/app/core/models/location/department.model';
import { City } from 'src/app/core/models/materials/city.model';
import { LocationService } from 'src/app/core/services/location.service';

@Component({
  selector: 'app-material-filters',
  templateUrl: './material-filters.component.html',
  styleUrls: ['./material-filters.component.scss'],
})
export class MaterialFiltersComponent {
  filtersForm: FormGroup;
  departments: Department[] = [];
  cities: City[] = [];

  @Output() filtersChanged = new EventEmitter<{
    type?: string;
    cityCode?: string;
    purchaseDate?: Date;
  }>();

  @Output() filtersCleared = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService
  ) {
    this.filtersForm = this.fb.group({
      departmentCode: [''],
      cityCode: [''],
      type: [''],
      purchaseDate: [null],
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.locationService.getAllDepartments().subscribe({
      next: (departments: Department[]) => {
        this.departments = departments;
      },
      error: (err: HttpErrorResponse) => console.error(err),
    });
  }

  loadCities(): void {
    this.locationService.getAllCities().subscribe({
      next: (cities: City[]) => {
        this.cities = cities;
      },
      error: (err: HttpErrorResponse) => console.error(err),
    });
  }

  onDepartmentChange(departmentCode: string): void {
    if (departmentCode) {
      this.locationService.getAllCities(departmentCode).subscribe({
        next: (data) => (this.cities = data),
      });
    } else {
      this.cities = [];
      this.filtersForm.patchValue({ cityCode: '' });
    }
  }

  applyFilters(): void {
    this.filtersChanged.emit(this.filtersForm.value);
  }

  clearFilters(): void {
    this.filtersForm.reset();
    this.filtersCleared.emit();
  }
}
