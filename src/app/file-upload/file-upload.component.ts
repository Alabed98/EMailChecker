import { Component } from '@angular/core';
import { ValidateEmailService } from '../services/validate-email.service';
import { UploaderService } from '../services/uploader.service';
import { CheckAdvanceService } from '../services/check-advance.service';
import { ErrorsService } from '../services/errors.service';
import { NotesService } from '../services/notes.service';
import * as JSZip from 'jszip';
import { ZipServiceService } from '../services/zip-service.service';
import { CheckTypeService } from '../services/check-type.service';

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
    private notesService:NotesService,
    private zipService:ZipServiceService,
    private checkTypeService:CheckTypeService
  ){
  this.selectedFile = null;
  this.emailService= new ValidateEmailService(this.checkAdvance, this.errorsService, this.notesService, this.checkTypeService);

  }


 async onFileSelected(event: Event) {
    this.notesService.setNotes({  
      header: '',
      impressum: '',
      links: [],
      unusedImages: [],
      anotherNotes: []
});

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }


    if(this.selectedFile?.type === "application/x-zip-compressed"){
      const numberHtmlFiles = await this.checkNumberOfHtmlFiles(this.selectedFile);

      
      if(!numberHtmlFiles){ //Error-Handel ist hier notwendig
        throw new Error("Die Zip-Datei enthält mehr als eine HTML-Datei")
      }
/*
      // with the bib jszip can the zip-folder be readed
      const zip = await JSZip.loadAsync(this.selectedFile);

      //zipEntry is the file in the zip-folder
      zip.forEach(async (relativePath, zipEntry) => {
        if(zipEntry.name.match("html")){
          const content = await zipEntry.async("string");
          
          this.uploader.getData(content);
          this.zipService.checkZipFile(zip, content)
        }
      })

      */
      this.zipService.checkZipFile(this.selectedFile)
    }

    else if(this.selectedFile?.name.match("html")){
        this.selectedFile?.text().then(data => {
        this.uploader.getData(data)
      })
    }
    else{
      throw new Error("Dateitype ist nicht erlaubt")  //Error-Handel ist hier notwendig
    }
  }

  async checkNumberOfHtmlFiles(file:File){
      const zip = await JSZip.loadAsync(file);
      let number = 0;

      zip.forEach((rellativePath, zipEntry) => {
        if(zipEntry.name.match("html")){
          number++
        }
      })
      return number>1 ? false:true;
  }
}
