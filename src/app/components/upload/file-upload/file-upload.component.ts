import { Component, Output ,EventEmitter} from '@angular/core';
import * as JSZip from 'jszip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notes } from '../../../notes';
import { Data } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {

  isDragOver= false;
  @Output() file = new EventEmitter<File>();

  constructor(
    private snackbar:MatSnackBar,
  ){}    

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
    if(file.name.toLowerCase().endsWith(".zip")){
    const numberHtmlFiles = await this.checkNumberOfHtmlFiles(file);

    if(numberHtmlFiles.length > 1){ 
      this.snackbar.open("Die Zip-Datei enthält mehr als eine HTML-Datei", "Ok", {duration:3000})
      throw new Error("Die Zip-Datei enthält mehr als eine HTML-Datei")
    }else{
      this.file.emit(file);
    }
      
      
    }
    else if(file.name.match("html")){

       this.file.emit(file)
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
