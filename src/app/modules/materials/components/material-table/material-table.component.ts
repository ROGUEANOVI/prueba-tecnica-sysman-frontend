import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialResponse } from 'src/app/core/models/materials/material-response.model';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss'],
})
export class MaterialTableComponent {
  @Input() set materials(value: MaterialResponse[]) {
    this.dataSource.data = value;
  }

  @Output() onDelete = new EventEmitter<number>();

  @Output() onEdit = new EventEmitter<MaterialResponse>();

  displayedColumns: string[] = [
    'id',
    'name',
    'type',
    'price',
    'status',
    'city',
    'purchaseDate',
    'saleDate',
    'actions',
  ];
  dataSource = new MatTableDataSource<MaterialResponse>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editMaterial(element: MaterialResponse) {
    this.onEdit.emit(element);
  }

  deleteMaterial(id: number) {
    this.onDelete.emit(id);
  }
}
