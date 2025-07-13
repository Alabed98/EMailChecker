import { Component } from '@angular/core';
import { ValidateEmailService } from '../validate-email.service';
import { UploaderService } from '../uploader.service';

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {

  selectedFile: File |null = null;
  emailService: ValidateEmailService = new ValidateEmailService();

  constructor(private uploader:UploaderService){}

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
