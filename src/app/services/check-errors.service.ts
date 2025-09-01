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
    let correctedCode = '';
    const htmlLines = html.split('\n');

    htmlLines.forEach((line, i) => {
      let corrected = line;
      const lineNumber = i + 1;

      if (line.includes('target="_blank"')) {
        errors.push(`${lineNumber}: target="_blank" gefunden`);
       // corrected = corrected.replace('target="_blank"', '');
      }

      if (line.includes(' €') || line.includes(' &euro;')) {
        errors.push(`${lineNumber}: [FEHLT] Geschütztes Leerzeichen (&nbsp;) vor € fehlt`);
       // corrected = corrected.replace(/ €/g, '&nbsp;€');
       // corrected = corrected.replace(/ &euro/g, '&nbsp;&euro');
      }

      if (line.includes('alt=""') || line.includes('alt="Cover"')) {
        errors.push(`${lineNumber}: alt-Attribut bei Bild nicht gesetzt oder gleich Cover`);
      }

      if (line.includes('ä')) {
        errors.push(`${lineNumber}: Nicht konvertierte ä`);
       // corrected = corrected.replace(/ä/g, '&auml;');
      }

      if (line.includes('ü')) {
        errors.push(`${lineNumber}: Nicht konvertierte ü`);
        //corrected = corrected.replace(/ü/g, '&uuml;');
      }

      if (line.includes('ö')) {
        errors.push(`${lineNumber}: Nicht konvertierte ö`);
       // corrected = corrected.replace(/ö/g, '&ouml;');
      }

      if (line.includes('ß')) {
        errors.push(`${lineNumber}: Nicht konvertierte ß`);
        //corrected = corrected.replace(/ß/g, '&szlig;');
      }

      if (line.includes(' %')) {
        errors.push(`${lineNumber}: [FEHLT] Geschütztes Leerzeichen (&nbsp;) vor % fehlt`);
        //corrected = corrected.replace(/ %/g, '&nbsp;%');
      }    
      
      if(
        line.includes("../a")  || 
        line.includes("https://static.fid-images.de/Investor/lp/bilder") ||
        line.includes("https://static.fid-images.de/maxLQ/lp/bilder") 
    ){
      errors.push(`${lineNumber}: Das Bild wird nicht lokal geladen`)

       //corrected = corrected.replaceAll("../a " , "")
       //corrected = corrected.replaceAll("https://static.fid-images.de/Investor/lp/bilder", "images")
       //corrected = corrected.replaceAll("https://static.fid-images.de/maxLQ/lp/bilder", "images")
    }
    
      //correctedCode += corrected + '\n';
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
    this.errorService.setErrors(errors);

    //return correctedCode ;
  }

  checkAdvance(html: string, htmlDom: Document): string {
      const errors: string[] = [];

      let correctedCode = ''

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
          errors.push("Links stimmen nicht")
        }
      });

      if(links.size <1){
        errors.push("Es wurden keine Links gefunden")
      }
      this.errorService.setErrors(errors);
      return correctedCode;
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
