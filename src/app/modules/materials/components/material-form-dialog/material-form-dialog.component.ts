import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-material-form-dialog',
  templateUrl: './material-form-dialog.component.html',
  styleUrls: ['./material-form-dialog.component.scss'],
})
export class MaterialFormDialogComponent  implements OnInit {
  materialForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MaterialFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.materialForm = this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
      purchaseDate: ['', [Validators.required]],
      saleDate: [''],
    });
  }

  onSubmit(): void {
    if (this.materialForm.valid) {
      this.dialogRef.close(this.materialForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
