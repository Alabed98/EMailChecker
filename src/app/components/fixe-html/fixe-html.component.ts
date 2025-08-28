import { Component } from '@angular/core';
import { ValidateEmailService } from '../../services/validate-email.service';
import { UploaderService } from '../../services/uploader.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-fixe-html',
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, CommonModule,EditorComponent],
  templateUrl: './fixe-html.component.html',
  styleUrl: './fixe-html.component.css'
})
export class FixeHtmlComponent {
  textarea:string = "";

  notes:string[]=[];
  constructor(private validateEmail: ValidateEmailService, private uploader: UploaderService){

  }

  fixeCode(){
    this.uploader.currentData$.subscribe(data =>{ 
      this.textarea = this.validateEmail.validate(data, "normal")[0];
    })
  }
}
