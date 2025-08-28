import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dialog',
  imports: [
    MatDialogClose,
    CommonModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  readonly data = inject<string>(MAT_DIALOG_DATA);
  constructor(public dialogRef: MatDialogRef<DialogComponent>){
  }

}
