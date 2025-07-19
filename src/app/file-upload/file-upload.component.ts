import { Component } from '@angular/core';
import { ValidateEmailService } from '../validate-email.service';
import { UploaderService } from '../uploader.service';
import { CheckAdvanceService } from '../check-advance.service';
import { ErrorsService } from '../errors.service';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {

  selectedFile: File | null;
  emailService: ValidateEmailService;


  constructor(
    private uploader:UploaderService, 
    private checkAdvance:CheckAdvanceService, 
    private errorsService: ErrorsService,
    private notesService:NotesService
  ){
    
  this.selectedFile = null;
  this.emailService= new ValidateEmailService(this.checkAdvance, this.errorsService, this.notesService);

  }



  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }

    if(this.selectedFile != null){
        this.selectedFile?.text().then(data => {
        this.uploader.getData(data)
      })
    }
  }
}
