import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-error-handel',
  imports: [    
    MatDialogClose
],
  templateUrl: './error-handel.component.html',
  styleUrl: './error-handel.component.css'
})
export class ErrorHandelComponent {

  readonly error = inject<string>(MAT_DIALOG_DATA)
  constructor(public dialogRef: MatDialogRef<ErrorHandelComponent>){

  }


  

}
