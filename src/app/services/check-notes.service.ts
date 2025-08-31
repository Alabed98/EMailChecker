import { Injectable } from '@angular/core';
import { Notes } from '../notes';
import { NotesService } from './notes.service';
import JSZip from 'jszip';
import { UploaderService } from './uploader.service';

@Injectable({
  providedIn: 'root'
})
export class CheckNotesService {

  constructor(private notesService: NotesService,
    private uploaderService:UploaderService
  ) { }

  checkNotes(html: string, htmlDom: Document): void {
      let notes:Notes = {
        header: '',
        impressum: '',
        preHeader: '',
        links: [],
        unusedImages: [],
        anotherNotes: []
      };
  
      const header = htmlDom.querySelector('.Logo') as HTMLImageElement;
  
      if ((!header || !header.alt) && !html.includes('{header}')) {
        if(html.includes('Investor Verlag')){
           notes.header = 'Investor';
        }
        else if(html.includes('Gevestor Verlag')){
          notes.header = 'GeVestor';
        }     
        else if(html.includes('maxLQ Logo')){
          notes.header = "maxLQ"
        }
        else{
          notes.header = 'Header nicht gefunden';
        } 
      } else if (html.includes('{header}')) {
          notes.header = '{header}';
      } else {
          (header.alt || '[kein Alt-Text]');
      }
      const impressum = htmlDom.querySelector('#impressum + p')?.textContent?.trim();

      if(html.includes('{Impressum maxLQ}')){
        notes.impressum = 'Impressum maxLQ';
      }
      else if (!impressum) {
        notes.impressum = 'Impressum nicht gefunden';
      }
      else {
        notes.impressum = impressum;
      }
  
      if(html.includes("{preHeader}")){
        notes.preHeader = "{preHeader}";
      }
      else{
        notes.preHeader = "Unbekannt"
      }
  
      const links = this.checkLinks(htmlDom)
  
      if (links.size > 0) {
        links.forEach(link => notes.links.push(link));
      }
  
      let currentNotes = this.notesService.getValue();
      notes.anotherNotes = currentNotes.anotherNotes;
      notes.unusedImages = currentNotes.unusedImages;
  
      this.notesService.setNotes(notes);
  
      notes = {
        header: '',
        impressum: '',
        preHeader: '',
        links: [],
        unusedImages: [],
        anotherNotes: []
      };
    }
  
    correct(zeile: string, zeichen: string, ersetzen: string): string {
      return zeile.replace(new RegExp(zeichen, 'g'), ersetzen);
    }
  
    checkLinks(htmlDom:Document) : Set<string> {
      const links = new Set<string>();
      htmlDom.querySelectorAll('a').forEach(a => {
        if (a.href) links.add(a.getAttribute('href')  || '');
      });
  
      return links;
    }
}
