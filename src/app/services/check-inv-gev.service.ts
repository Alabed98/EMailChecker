import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckInvGevService {

  constructor() { }

  checkInvGev(content:string){
    let errors:string [] = []
    if(content.includes('Investor Verlag')){
        
    }
  }
}
