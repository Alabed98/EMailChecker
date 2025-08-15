import { Injectable } from '@angular/core';
import JSZip from 'jszip';
import { NotesService } from './notes.service';
import { UploaderService } from './uploader.service';

@Injectable({
  providedIn: 'root'
})
export class ZipServiceService {

  constructor(
    private notesService:NotesService,
    private uploader:UploaderService   
  ) { }

  imageType : string [] = ["png", "jpg", "gif"]
  images:string[] = [];
/*
  checkZipFile(file:JSZip, content:string){

    // alte Notes werden beim Laden neuer Zip-Datei gelöscht. Dadurch werden alte Notes aus anderen ZIP-Dateien gelöscht
    this.images = []
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

*/
async checkZipFile(file:File){

   // with the bib jszip can the zip-folder be readed
      const zip = await JSZip.loadAsync(file);

      let content = "";
      const htmlEntries = Object.values(zip.files).filter(entry => entry.name.endsWith(".html"));
      if (htmlEntries.length > 0) {
        content = await htmlEntries[0].async("string");
        this.uploader.getData(content);
      }

      const imageEntries = Object.values(zip.files).filter(entry =>  this.imageType.some(type => entry.name.includes(type)))
      const images = imageEntries.map(entry => entry.name)
      const cssEntries = Object.values(zip.files).filter(entry => entry.name.endsWith("css"));
   
      if(cssEntries.length > 0){
        this.addNotes("Die Zip-Datei enthält CSS-Dateien")
      }

      if(imageEntries.length > 0) {
        this.isImageUsed(images, content);
      }
      const zipSize=Math.floor(file.size / 1000);

      if(zipSize> 999){
      this.addNotes("Die Größe der Zip-Datei ist: " + zipSize / 1000  + " mb")
      }
      else{
      this.addNotes("Die Größe der Zip-Datei ist: " + zipSize  + " kb")

      }
  }

  isImageUsed(images:string [], content:string){
    let notUsedImage:string [] = []
    images.forEach(imagePath => {
      if(!content.includes(imagePath)){
        this.addImageNote("Dieses Bild wird nicht benutzt: " +  imagePath)
      }
    })
  }

  //Neue Hinweise werden hiermit eingefügt
  addImageNote(note:string){
    let currentNotes = this.notesService.getValue();
    currentNotes.unusedImages.push(note);
    this.notesService.setNotes(currentNotes)
  }

    //Neue Hinweise werden hiermit eingefügt
  addNotes(note:string){
    let currentNotes = this.notesService.getValue();
    currentNotes.anotherNotes.push(note)
    this.notesService.setNotes(currentNotes)
  }


}
