import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsRoutingModule } from './materials-routing.module';
import { MaterialListComponent } from './pages/material-list/material-list.component';
import { MaterialTableComponent } from './components/material-table/material-table.component';
import { MaterialUiModule } from 'src/app/material-ui/material-ui.module';
import { MaterialFormDialogComponent } from './components/material-form-dialog/material-form-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MaterialListComponent,
    MaterialTableComponent,
    MaterialFormDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialsRoutingModule,
    MaterialUiModule,
    ReactiveFormsModule
  ]
})
export class MaterialsModule { }
