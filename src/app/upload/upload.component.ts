import { Component, Input } from '@angular/core';
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
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  textarea:string = '';
  errors:string [] = [];
  notes:string [] = [];

  @Input() emailType:string = "normal";
  constructor(private validate: ValidateEmailService, private uploader:UploaderService) {}

  ngOnInit(){
    this.uploader.currentData$.subscribe(data => {
      this.check(data)
      this.textarea = data
    })
  }

  checkErrors(){
    this.check(this.textarea)
    this.uploader.getData(this.textarea)
  }

  check(data: string) {
    console.log(this.emailType)
    const result = this.validate.validate(data, this.emailType);

    this.errors = result.errors.length === 0
      ? ["Keine Probleme gefunden"]
      : [...result.errors];

    this.notes = result.notes.length === 0
      ? ["Keine Hinweise gefunden"]
      : [...result.notes];
  }
}
