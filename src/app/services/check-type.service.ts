import { Injectable } from '@angular/core';
import { NotesService } from './notes.service';

@Injectable({
  providedIn: 'root'
})
export class CheckTypeService {

  constructor(private notesService:NotesService) { }
  header:string = "";
  impressumg:string = "";
  link:string [] = [];
  preHeader:string = "";
  spamUndAbmelden:string = "";
  mailType = "Unbekannt";

  check(content:string, dom:Document):string{
    this.setHeader(content);
    this.setImpressum(content);
    this.setLink(content);
    this.setPreHeader(content);
    this.setSpamUndAbmelden(content);
    return this.checkTemplate()

  }
  setHeader(content:string){
    if(content.includes("Investor Verlag")){
      this.header="Investor"
    }
    else if(content.includes("Gevestor Verlag")){
      this.header="GeVestor"
    }
    else if(content.includes("maxLQ Logo")){
      this.header="maxLQ"
    }
    else if(content.includes("{header}")){
      this.header="Advance"
    }
    else{
      this.header="Unbekannt"
    }
  }
  setImpressum(content:string){
    if(content.includes("Impressum_FID")){
      this.impressumg="Investor"
    }
    else if(content.includes("{Impressum GeVestor}")){
      this.impressumg="GeVestor"
    }
    else if(content.includes("{Impressum maxLQ}")){
      this.impressumg="maxLQ"
    }
    else if(content.includes("{footer}")){
      this.impressumg="Advance"
    }
    else if(content.includes("{Imprint_Abo_FID_Investor}")){
      this.impressumg="Abo Investor"
    }
    else if(content.includes("{Imprint_Abo_GEV_gevestor}")){
      this.impressumg="Abo GeVestor"
    }
    else if(content.includes("{Impressum_Webinar_Investor}")){
      this.impressumg="Webinar Investor"
    }
    else if(content.includes("{Impressum_Webinar_Gevestor}")){
      this.impressumg="Webinar GeVestor"
    }
    else{
      this.impressumg="Unbekannt"
    }
  }
  setLink(content:string){
    if(content.includes("{landingpageUrl}")){
      this.link.push("{landingpageUrl}")
    }

    this.notesService.currentNotes$.subscribe(data => {
      this.link = data.links;
    })
  }
  setPreHeader(content:string){
    if(content.includes("{preHeader}")){
      this.preHeader="Advance"
    }
  }
  setSpamUndAbmelden(content:string){
    if(content.includes("Abmelden")){
      if(content.includes("https://nlv-gevestor.de")){
        this.spamUndAbmelden="GeVestor"
      }
      else if(content.includes("https://nlv-investor.de")){
        this.spamUndAbmelden="Investor"
      }
      else{this.spamUndAbmelden="Kein"}
    }
    else{this.spamUndAbmelden="Kein"}
  }

  checkTemplate():string{
        console.log("spam" + this.spamUndAbmelden + " header:" +  this.header +" Imperssum:" + this.impressumg + "preheader" + this.preHeader + " link" + this.link )
    if(
      this.header === this.impressumg && 
      this.header === "Investor" && 
      this.spamUndAbmelden === "Investor"
    )
    {
      return "Investor";
    }
    else if(
      this.header === this.impressumg &&
      this.header === "GeVestor" &&
      this.spamUndAbmelden === "GeVestor"
    ){
      return "GeVestor"
    }
    else if(
      this.header === this.impressumg &&
      this.header === "maxLQ"
    ){
      return "maxLQ"
    }
    else if(
      this.header === "Advance" &&
      this.impressumg === "Advance" &&
      this.spamUndAbmelden === "Kein" &&
      this.preHeader === "Advance" &&
      this.link.includes("{landingpageUrl}")

    ){
      return "Advance"
    }
    else if(
      this.header === "GeVestor" &&
      this.impressumg === "Webinar GeVestor" &&
      this.spamUndAbmelden === "Kein"
    ){
      return "Webinar GeVestor"
    }

    else if(
      this.header === "Investor" &&
      this.impressumg === "Webinar Investor" &&
      this.spamUndAbmelden === "Kein"
    ){
      return "Webinar Investor"
    }

    return "unbekannt"
  }
  checkInvestor():string{
    if(
      this.header === this.impressumg && 
      this.header === "Investor" && 
      this.spamUndAbmelden === "Investor"
    )
    {
        this.mailType = "Investor";
    }
    return this.mailType;
  }
}
