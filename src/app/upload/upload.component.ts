import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ValidateEmailService } from '../validate-email.service';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from "../file-upload/file-upload.component";
import { UploaderService } from '../uploader.service';
import { ErrorMassageComponent } from "../error-massage/error-massage.component";
import { NotesMassageComponent } from "../notes-massage/notes-massage.component";

@Component({
  selector: 'app-upload',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    FileUploadComponent,
    ErrorMassageComponent,
    NotesMassageComponent
],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
    encapsulation: ViewEncapsulation.None
})
export class UploadComponent {
  textarea:string = '';

  @Input() emailType:string = "normal";
  constructor(
    private validateService: ValidateEmailService, 
    private uploader:UploaderService, 
  ) {}

  ngOnInit(){
    this.uploader.currentData$.subscribe(data => {
      this.validateService.validate(data, this.emailType);
      this.textarea = data
    })
  }

  checkErrors(){
    this.validateService.validate(this.textarea, this.emailType);
    this.uploader.getData(this.textarea)
  }
}
