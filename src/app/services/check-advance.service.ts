import { Injectable } from '@angular/core';
import { ErrorsService } from './errors.service';

@Injectable({
  providedIn: 'root'
})
export class CheckAdvanceService {

  constructor(private errorsService:ErrorsService) { }

    check(html: string, htmlDom: Document): string {
      const errors: string[] = [];

      let correctedCode = ''

      if(!html.includes('{header')){
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
      this.errorsService.setErrors(errors);
      return correctedCode;
  }

   checkLinks(htmlDom:Document){
    const links = new Set<string>();
    htmlDom.querySelectorAll('a').forEach(a => {
      if (a.href) links.add(a.getAttribute('href')  || '');
    });

    return links;
  }
}
