import { Injectable } from '@angular/core';
import { CheckAdvanceService } from './check-advance.service';
import { ErrorsService } from './errors.service';
import { NotesService } from './notes.service';
import { CheckTypeService } from './check-type.service';
import { Notes } from '../notes';

interface Result {
  correctedCode: string;
}

@Injectable({ providedIn: 'root' })
export class ValidateEmailService {
  htmlCode!: string;

constructor(
  private checkAdvance: CheckAdvanceService, 
  private errorsService:ErrorsService,
  private notesService: NotesService,
  private checkTypeService:CheckTypeService
) {}

  validate(html: string = '', emailType:string): string [] {
    if (!html && this.htmlCode) {
      html = this.htmlCode;
    }

    const parser = new DOMParser();
    const htmlDom = parser.parseFromString(html, 'text/html');
    let correctedCode:string = "";
    let info="";
    switch(emailType){
      case 'advnce':
        info =  this.checkAdvance.check(html, htmlDom)
        break;
      case 'checkType':
        info =  this.checkTypeService.check(html, htmlDom)
        break;
      default: 
        correctedCode = this.checkErrors(html,htmlDom);

    }

    this.checkNotes(html, htmlDom);

    return [correctedCode, info];
  }

  checkErrors(html: string, htmlDom: Document): string {
    const errors: string[] = [];
    let correctedCode = '';
    const htmlLines = html.split('\n');

    htmlLines.forEach((line, i) => {
      let corrected = line;
      const lineNumber = i + 1;

      if (line.includes('target="_blank"')) {
        errors.push(`${lineNumber}: target="_blank" gefunden`);
        corrected = corrected.replace('target="_blank"', '');
      }

      if (line.includes(' €') || line.includes(' &euro;')) {
        errors.push(`${lineNumber}: [FEHLT] Geschütztes Leerzeichen (&nbsp;) vor € fehlt`);
        corrected = corrected.replace(/ €/g, '&nbsp;€');
        corrected = corrected.replace(/ &euro/g, '&nbsp;&euro');
      }

      if (line.includes('alt=""') || line.includes('alt="Cover"')) {
        errors.push(`${lineNumber}: alt-Attribut bei Bild nicht gesetzt oder gleich Cover`);
      }

      if (line.includes('ä')) {
        errors.push(`${lineNumber}: Nicht konvertierte ä`);
        corrected = corrected.replace(/ä/g, '&auml;');
      }

      if (line.includes('ü')) {
        errors.push(`${lineNumber}: Nicht konvertierte ü`);
        corrected = corrected.replace(/ü/g, '&uuml;');
      }

      if (line.includes('ö')) {
        errors.push(`${lineNumber}: Nicht konvertierte ö`);
        corrected = corrected.replace(/ö/g, '&ouml;');
      }

      if (line.includes('ß')) {
        errors.push(`${lineNumber}: Nicht konvertierte ß`);
        corrected = corrected.replace(/ß/g, '&szlig;');
      }

      if (line.includes(' %')) {
        errors.push(`${lineNumber}: [FEHLT] Geschütztes Leerzeichen (&nbsp;) vor % fehlt`);
        corrected = corrected.replace(/ %/g, '&nbsp;%');
      }    
      
      if(
        line.includes("../a")  || 
        line.includes("https://static.fid-images.de/Investor/lp/bilder") ||
        line.includes("https://static.fid-images.de/maxLQ/lp/bilder") 
    ){
      errors.push(`${lineNumber}: Das Bild wird nicht lokal geladen`)

       corrected = corrected.replaceAll("../a " , "")
       corrected = corrected.replaceAll("https://static.fid-images.de/Investor/lp/bilder", "images")
       corrected = corrected.replaceAll("https://static.fid-images.de/maxLQ/lp/bilder", "images")
    }

      correctedCode += corrected + '\n';
    });

    if (html.trim() === '') {
      errors.push('Textarea ist leer');
    }

    const title = htmlDom.querySelector('title')?.textContent?.trim();
    if (!title) {
      errors.push('--: [FEHLT] <title>-Tag fehlt oder ist leer');
    }

    if (/googleapis\.com/.test(html)) {
      errors.push('[WARNUNG] Google Fonts verwendet – bitte Bunny Fonts nutzen');
    }
    this.errorsService.getErrors(errors);
    return correctedCode ;
  }

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
      else{
        notes.header = 'Header nicht gefunden';
      } 
    } else if (html.includes('{header}')) {
        notes.header = '{header}';
    } else {
        (header.alt || '[kein Alt-Text]');
    }
    const impressum = htmlDom.querySelector('#impressum + p')?.textContent?.trim();
    if (!impressum) {
      notes.impressum = 'Impressum nicht gefunden';
    } else {
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

  checkLinks(htmlDom:Document){
    const links = new Set<string>();
    htmlDom.querySelectorAll('a').forEach(a => {
      if (a.href) links.add(a.getAttribute('href')  || '');
    });

    return links;
  }
}
