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

async checkZipFile(file:File){
   let notes = {
        header: '',
        impressum: '',
        preHeader: '',
        links: [],
        unusedImages: [],
        anotherNotes: []
    };
    this.notesService.setNotes(notes)
    //with the bib jszip can the zip-folder be readed
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
    console.log("current Notes")
    console.log(currentNotes)
    this.notesService.setNotes(currentNotes)
  }

    //Neue Hinweise werden hiermit eingefügt
  addNotes(note:string){
    let currentNotes = this.notesService.getValue();
    currentNotes.anotherNotes.push(note);
    console.log("current Notes")
    console.log(currentNotes)
    this.notesService.setNotes(currentNotes);
  }
}
