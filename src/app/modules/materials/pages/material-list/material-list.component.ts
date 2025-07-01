import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialResponse } from 'src/app/core/models/materials/material-response.model';
import { MaterialService } from 'src/app/core/services/material.service';
import { MatDialog } from '@angular/material/dialog';
import { MaterialFormDialogComponent } from '../../components/material-form-dialog/material-form-dialog.component';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss'],
})
export class MaterialListComponent {
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

  constructor(private materialService: MaterialService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadMaterials();
  }

  loadMaterials(): void {
    this.materialService.getMaterials().subscribe({
      next: (materials) => {
        this.dataSource = new MatTableDataSource(materials);
        this.dataSource.paginator = this.paginator;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error?.error?.error || 'Correo o contraseña incorrectos');
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openRegisterDialog(): void {
    this.dialog.open(MaterialFormDialogComponent, {
      width: '500px',
      data: {
        cities: [], // aquí puedes pasar las ciudades desde el backend más adelante
      },
    });
  }
}
