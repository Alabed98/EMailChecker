import { Component } from '@angular/core';
import { ValidateEmailService } from '../../services/validate-email.service';
import { UploaderService } from '../../services/uploader.service';
import { CheckAdvanceService } from '../../services/check-advance.service';
import { ErrorsService } from '../../services/errors.service';
import { NotesService } from '../../services/notes.service';
import * as JSZip from 'jszip';
import { ZipServiceService } from '../../services/zip-service.service';
import { CheckTypeService } from '../../services/check-type.service';
import { Notes } from '../../notes';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {

  emailService: ValidateEmailService;
  isDragOver= false;

  constructor(
    private uploader:UploaderService, 
    private checkAdvance:CheckAdvanceService, 
    private errorsService: ErrorsService,
    private notesService:NotesService,
    private zipService:ZipServiceService,
    private checkTypeService:CheckTypeService, 
    private snackbar:MatSnackBar
  ){
    this.emailService= new ValidateEmailService(this.checkAdvance, this.errorsService, this.notesService, this.checkTypeService);
  }    
   notes:Notes = {
        header: '',
        impressum: '',
        preHeader: '',
        links: [],
        unusedImages: [],
        anotherNotes: []
      };

  async onFileSelected(event: Event) {
    let files :FileList | null = null;
    if(event instanceof Event && !(event instanceof DragEvent)){
      const input = event.target as HTMLInputElement;
      files = input.files;
    }

    if(event instanceof DragEvent){
      files = event.dataTransfer?.files || null
    }
    
    if (files && files.length > 0) {
       await this.fileHandel(files[0])
    }
  }

  async fileHandel(file:File){
      this.notesService.setNotes(this.notes)

      if(file.type === "application/x-zip-compressed"){
      const numberHtmlFiles = await this.checkNumberOfHtmlFiles(file);

      if(numberHtmlFiles.length > 1){ 
        this.snackbar.open("Die Zip-Datei enthält mehr als eine HTML-Datei", "Ok", {duration:3000})
        throw new Error("Die Zip-Datei enthält mehr als eine HTML-Datei")
      }
      this.zipService.checkZipFile(file)
    }

    else if(file.name.match("html")){
        file.text().then(data => {

        this.uploader.getData(data)
      })
    }
    else{
      this.snackbar.open("Dateitype ist nicht erlaubt", "Ok", {duration:3000})
      throw new Error("Dateitype ist nicht erlaubt") 
    }
  }

  async checkNumberOfHtmlFiles(file:File){
    const zip = await JSZip.loadAsync(file);

    return Object.values(zip.files).filter(entry => entry.name.endsWith("html"))
  }

  onDrop(event: DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.onFileSelected(event);
  }

  onDragOver(event:DragEvent){ 
    event.preventDefault(); 
    this.isDragOver = true; 
  } 
  
  onDragLeave(event:DragEvent){ 
    event.preventDefault(); 
    this.isDragOver = false; 
  }
}
