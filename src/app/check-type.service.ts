import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckTypeService {

  constructor() { }
  header:String = "";
  impressumg:String = "";
  link:String = "";
  preHeader:String = "";

  mailType = "Unbekannt"
  check(content:String, dom:Document):string{
    return this.checkInvestor(content)
  }

  checkInvestor(htmlCode:String):string{
    if(htmlCode.includes("Investor Verlag")) 
      this.header = "Investor"

    if(htmlCode.includes("Impressum_FID"))
      this.impressumg = "Investor"
    
    if(htmlCode.includes("Gevestor Verlag")) 
      this.header = "Gevestor"

    if(htmlCode.includes("Impressum GeVestor"))
      this.impressumg = "Gevestor"
    
    
    

    //Check Investor
    if((this.header === this.impressumg)){
      if(this.header === 'Investor'){
        this.mailType = "Investor";
      }
      else if(this.header === 'Gevestor'){
        this.mailType = "Gevesotr"
      }


    }
    
    return this.mailType;

  }
}
