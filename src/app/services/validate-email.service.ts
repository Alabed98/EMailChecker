import { Injectable } from '@angular/core';
import { CheckTypeService } from './check-type.service';
import { CheckErrorsService } from './check-errors.service';
import { CheckNotesService } from './check-notes.service';
import { NotesService } from './notes.service';
import { ErrorsService } from './errors.service';
import JSZip from 'jszip';
import { UploaderService } from './uploader.service';

interface Result {
  correctedCode: string;
}

@Injectable({ providedIn: 'root' })
export class ValidateEmailService {
  htmlCode!: string;

constructor(
  private checkTypeService:CheckTypeService, 
  private checkErrorsService:CheckErrorsService, 
  private checkNotesService:CheckNotesService,
  private notesService:NotesService,
  private errorsService:ErrorsService, 
  private uploaderService:UploaderService
) {}

  imageType : string [] = ["png", "jpg", "gif"]
  images:string[] = [];

  validate(html: string = '', emailType:string ): string {

    this.notesService.setNotes({
        header: '',
        impressum: '',
        preHeader: '',
        links: [],
        unusedImages: [],
        anotherNotes: []
    })
    this.errorsService.setErrors([])

    if (!html && this.htmlCode) {
      html = this.htmlCode;
    }

    const parser = new DOMParser();
    const htmlDom = parser.parseFromString(html, 'text/html');
    let correctedCode:string = "";
    let info="";
    switch(emailType){
      case 'advance':
        this.checkErrorsService.checkAdvance(html, htmlDom)
        this.checkNotesService.checkNotes(html, htmlDom);
        break;
      case 'checkType':
        info =  this.checkTypeService.check(html, htmlDom)
        this.checkNotesService.checkNotes(html, htmlDom);
        break;
      default: 
        this.checkErrorsService.checkErrors(html,htmlDom);
        this.checkNotesService.checkNotes(html, htmlDom);
    }
    this.uploaderService.getData(html);
    return info;
  }

  async validateZip(file:File){
    let notes = {
      header: '',
      impressum: '',
      preHeader: '',
      links: [],
      unusedImages: [],
      anotherNotes: []
    };
        //with the bib jszip can the zip-folder be readed
    const zip = await JSZip.loadAsync(file);
    
    let content = "";
    const htmlEntries = Object.values(zip.files).filter(entry => entry.name.endsWith(".html"));
    if (htmlEntries.length > 0) {
      content = await htmlEntries[0].async("string");
      this.validate(content, "")
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
    currentNotes.anotherNotes.push(note);
    this.notesService.setNotes(currentNotes);
  }  
}
