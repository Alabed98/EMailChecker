import { Injectable } from '@angular/core';
import { privateDecrypt } from 'crypto';
import { ErrorsService } from './errors.service';

@Injectable({
  providedIn: 'root'
})
export class CheckErrorsService  {

  constructor(private errorService:ErrorsService) { }


  checkErrors(html: string, htmlDom: Document) {
    const errors: string[] = [];
    const htmlLines = html.split('\n');

    htmlLines.forEach((line, i) => {
      const lineNumber = i + 1;

      if (line.includes('target="_blank"')) {
        errors.push(`${lineNumber}: Verwendung von target="_blank" gefunden – bitte entfernen.`);
      }

      if (line.includes(' €') || line.includes(' &euro;')) {
        errors.push(`${lineNumber}: Vor dem Euro-Zeichen fehlt ein geschütztes Leerzeichen (&nbsp;).`);
      }

      if (line.includes('alt=""') || line.includes('alt="Cover"')) {
        errors.push(`${lineNumber}: Bild ohne aussagekräftiges alt-Attribut gefunden (leer oder "Cover").`);
      }

      if (line.includes('ä')) {
        errors.push(`${lineNumber}: Umlaut "ä" nicht konvertiert – bitte als &auml; schreiben.`);
      }

      if (line.includes('ü')) {
        errors.push(`${lineNumber}: Umlaut "ü" nicht konvertiert – bitte als &uuml; schreiben.`);
      }

      if (line.includes('ö')) {
        errors.push(`${lineNumber}: Umlaut "ö" nicht konvertiert – bitte als &ouml; schreiben.`);
      }

      if (line.includes('ß')) {
        errors.push(`${lineNumber}: Zeichen "ß" nicht konvertiert – bitte als &szlig; schreiben.`);
      }

      if (line.includes(' %')) {
        errors.push(`${lineNumber}: Vor dem Prozentzeichen fehlt ein geschütztes Leerzeichen (&nbsp;).`);
      }    
      
      if(
        line.includes("../a")  || 
        line.includes("https://static.fid-images.de/Investor/lp/bilder") ||
        line.includes("https://static.fid-images.de/maxLQ/lp/bilder") 
      ){
        errors.push(`${lineNumber}: Bild wird nicht lokal geladen`)
      }
    
    });

    if (html.trim() === '') {
      errors.push('Eingabe ist leer – bitte HTML-Code einfügen.');
    }

    const title = htmlDom.querySelector('title')?.textContent?.trim();
    if (!title) {
      errors.push('[FEHLT]: <title>-Tag fehlt oder ist leer.');
    }

    if (/googleapis\.com/.test(html)) {
      errors.push('[WARNUNG]: Google Fonts gefunden – bitte stattdessen Bunny Fonts verwenden.');
    }
    this.errorService.setErrors(errors);

  }

  checkAdvance(html: string, htmlDom: Document) {
      const errors: string[] = [];

      if(!html.includes('{header}')){
        errors.push('Verwendeter Header ist nicht {header}');
      }

      if(!html.includes('{footer}')){
        errors.push('Verwendeter footer ist nicht {footer}');
      }

      if(!html.includes('{preHeader}')){
        errors.push('PreHeader existiert nicht');
      }

      const links = this.checkLinks(htmlDom);

      links.forEach(link => {
        if(link != "{landingpageUrl}"){
          errors.push(`Ungültiger Link gefunden: "${link}" – erlaubt ist nur {landingpageUrl}.`)
        }
      });

      if(links.size <1){
        errors.push("Es wurden keine Links gefunden – bitte {landingpageUrl} einfügen.")
      }
      this.errorService.setErrors(errors);
  }

  checkLinks(htmlDom:Document) {
    const links = new Set<string>();
    htmlDom.querySelectorAll('a').forEach(a => {
      if (a.href) links.add(a.getAttribute('href')  || '');
    });

    return links;
  }

  correctCode(content:string) : string{
    content = content.replace(/target="_blank"/g, '');
    content = content.replace(/ €/g, '&nbsp;€');
    content = content.replace(/ &euro;/g, '&nbsp;&euro;');
    content = content.replace(/ä/g, '&auml;');
    content = content.replace(/ü/g, '&uuml;');
    content = content.replace(/ö/g, '&ouml;');
    content = content.replace(/ß/g, '&szlig;');
    content = content.replaceAll(" %", "&nbsp;%");
    content = content.replaceAll("../a ", "");
    content = content.replaceAll("https://static.fid-images.de/Investor/lp/bilder", "images");
    content = content.replaceAll("https://static.fid-images.de/maxLQ/lp/bilder", "images");
    return content;
  }
}
