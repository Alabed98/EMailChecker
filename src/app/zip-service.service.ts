import { Injectable } from '@angular/core';
import JSZip from 'jszip';
import { NotesService } from './notes.service';

@Injectable({
  providedIn: 'root'
})
export class ZipServiceService {

  constructor(
    private notesService:NotesService    
  ) { }

  imageType : string [] = ["png", "jpg", "gif"]
  images:string[] = [];

  checkZipFile(file:JSZip, content:string){

    // alte Notes werden beim Laden neuer Zip-Datei gelöscht. Dadurch werden alte Notes aus anderen ZIP-Dateien gelöscht
    this.notesService.getNotes([]);

    file.forEach( async (relativePath, zipEntry) => {
      if(this.imageType.some(type => relativePath.includes(type))){
          this.images.push(relativePath)
      }
      
      if(relativePath.includes('css')){
         this.addNotes("Die Zip-Datei enthält CSS-Dateien")
      }
    })
    
    if(this.images.length > 0) {
      this.isImageUsed(this.images, content);
    }
    return(this.images)
  }

  isImageUsed(images:string [], content:string){
    let notUsedImage:string [] = []
    images.forEach(imagePath => {
      if(!content.includes(imagePath)){
        this.addNotes("Dieses Bild wird nicht benutzt: " +  imagePath)
      }
    })
  }

  //Neue Hinweise werden hiermit eingefügt
  addNotes(note:string){
    let currentNotes = this.notesService.getValue();
    this.notesService.getNotes([...currentNotes, note])
  }
}
