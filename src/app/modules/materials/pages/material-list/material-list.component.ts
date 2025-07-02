import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialResponse } from 'src/app/core/models/materials/material-response.model';
import { MaterialService } from 'src/app/core/services/material.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialFormDialogComponent } from '../../components/material-form-dialog/material-form-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss'],
})
export class MaterialListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'type',
    'purchaseDate',
    'saleDate',
    'city',
    'actions',
  ];

  dataSource: MatTableDataSource<MaterialResponse> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private materialService: MaterialService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadMaterials();
  }

  loadMaterials(): void {
    this.materialService.searchMaterials().subscribe({
      next: (materials) => {
        this.dataSource = new MatTableDataSource(materials);
        this.dataSource.paginator = this.paginator;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error?.message || 'Correo o contraseña incorrectos');
      },
    }); 
  }

  applyFilters(filters: any): void {
    const { cityCode, type, purchaseDate } = filters;
    const dateString = purchaseDate
      ? new Date(purchaseDate).toISOString().split('T')[0]
      : undefined;

    this.materialService.searchMaterials(type, cityCode, dateString).subscribe({
      next: (materials) => {
        console.log('materials', materials);
        this.dataSource.data = materials;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error(err),
    });
  }

  onFiltersChanged(filters: any): void {
    this.applyFilters(filters);
  }

  onFiltersCleared(): void {
    this.loadMaterials();
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(MaterialFormDialogComponent, {
      width: '500px',
      data: {
        cities: [],
        titleFormDialog: 'Registrar Material',
        confirmationButtonText: 'Guardar',
      },
    });

    this.reloadMaterials(dialogRef);
  }

  openUpdateDialog(material: MaterialResponse): void {
    const dialogRef = this.dialog.open(MaterialFormDialogComponent, {
      width: '500px',
      data: {
        material,
        titleFormDialog: 'Actualizar Material',
        confirmationButtonText: 'Actualizar',
      },
    });

    this.reloadMaterials(dialogRef);
  }

  confirmDeleteMaterial(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el material de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.materialService.deleteMaterial(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El material ha sido eliminado.', 'success');
            this.loadMaterials();
          },
          error: (error: HttpErrorResponse) => {
            Swal.fire('Error', error?.message, 'error');
          },
        });
      }
    });
  }

  private reloadMaterials(
    dialogRef: MatDialogRef<MaterialFormDialogComponent, any>
  ): void {
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadMaterials();
      }
    });
  }
}
