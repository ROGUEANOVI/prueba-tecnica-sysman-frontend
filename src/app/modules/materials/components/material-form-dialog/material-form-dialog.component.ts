import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocationService } from '../../../../core/services/location.service';
import { MaterialService } from 'src/app/core/services/material.service';
import { Department } from 'src/app/core/models/location/department.model';
import { type City } from 'src/app/core/models/materials/city.model';
import { type MaterialRequest, Status } from 'src/app/core/models/materials/material-request.model';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-material-form-dialog',
  templateUrl: './material-form-dialog.component.html',
  styleUrls: ['./material-form-dialog.component.scss'],
})
export class MaterialFormDialogComponent implements OnInit {
  materialForm: FormGroup;

  titleFormDialog: string = '';

  confirmationButtonText: string = '';

  departments: Department[] = [];

  cities: City[] = [];

  statusList: Status[] = ['ACTIVO', 'DISPONIBLE', 'ASIGNADO'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MaterialFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private locationService: LocationService,
    private materialService: MaterialService
  ) {
    this.materialForm = this.fb.group(
      {
        name: ['', Validators.required],
        description: ['', [Validators.maxLength(200)]],
        type: ['', Validators.required],
        price: [null, [Validators.required, Validators.min(0)]],
        status: ['ACTIVO', Validators.required],
        departmentCode: ['', Validators.required],
        cityCode: ['', Validators.required],
        purchaseDate: ['', Validators.required],
        saleDate: [''],
      },
      { validators: this.validateDates }
    );
  }

  ngOnInit(): void {
    this.loadDepartments();

    const updateMaterial = this.data?.material;

    this.titleFormDialog = updateMaterial ? 'Actualizar Material' : 'Registrar Material';
    this.confirmationButtonText = updateMaterial ? 'Actualizar' : 'Registrar';

    if (updateMaterial) {
      this.materialForm.patchValue({
        name: updateMaterial.name,
        description: updateMaterial.description,
        type: updateMaterial.type,
        price: updateMaterial.price,
        purchaseDate: new Date(updateMaterial.purchaseDate),
        saleDate: updateMaterial.saleDate ? new Date(updateMaterial.saleDate) : null,
        status: updateMaterial.status,
        departmentCode: updateMaterial.city.department.code,
        cityCode: updateMaterial.city.code,
      });

      const departmentCode = updateMaterial.city.department.code;

      this.locationService.getAllCities(departmentCode).subscribe((cities) => {
        this.cities = cities;
      });

    }
  }

  loadDepartments(): void {
    this.locationService
      .getAllDepartments()
      .subscribe((departments: Department[]) => {
        this.departments = departments;
      });
  }

  onDepartmentChange(departmentCode: string): void {
    this.locationService
      .getAllCities(departmentCode)
      .subscribe((cities: City[]) => {
        this.cities = cities;
        this.materialForm.get('cityCode')?.setValue('');
      });
  }

  onSubmit(): void {
    if (this.materialForm.invalid) return;

    const formValue = this.materialForm.value;

    const request: MaterialRequest = {
      name: formValue.name,
      description: formValue.description,
      type: formValue.type,
      price: formValue.price,
      purchaseDate: this.formatDate(formValue.purchaseDate),
      saleDate: formValue.saleDate ? this.formatDate(formValue.saleDate) : null,
      status: formValue.status,
      cityCode: formValue.cityCode,
    };

    if (this.data?.material.id) {
      request.id = this.data.material.id;

      this.materialService.updateMaterial(this.data.material.id, request).subscribe({
        next: (material) => {
          this.dialogRef.close(material);

          Swal.fire({
            icon: 'success',
            title: 'Material actualizado correctamente',
            confirmButtonText: 'OK',
          });

        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el material',
            text: error?.error?.message || 'Ocurrio un error inesperado',
          })
        },
      })
    }
    else {
      this.materialService.createMaterial(request).subscribe({
        next: (material) => {
          this.dialogRef.close(material);

          Swal.fire({
            icon: 'success',
            title: 'Material creado correctamente',
            confirmButtonText: 'OK',
          });
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el material',
            text: error?.error?.message || 'Ocurrio un error inesperado',
          });
        },
      });
    }

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private validateDates(formGroup: FormGroup) {
    const purchaseDate = formGroup.get('purchaseDate')?.value;
    const saleDate = formGroup.get('saleDate')?.value;

    if (
      purchaseDate &&
      saleDate &&
      new Date(purchaseDate) > new Date(saleDate)
    ) {
      return { invalidDateRange: true };
    }

    return null;
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
