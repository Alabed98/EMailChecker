import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SNIPPETS } from '../../templates';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditorComponent } from "../editor/editor.component";
import { templateInfo } from '../../templatesInfo';
import {CommonModule} from '@angular/common'

@Component({
  selector: 'app-code-snippets',
  imports: [FormsModule, EditorComponent,CommonModule],
  templateUrl: './code-snippets.component.html',
  styleUrl: './code-snippets.component.css'
})
export class CodeSnippetsComponent {
  code:string = "";
  infos:string [] = [];

  constructor(private snackbar:MatSnackBar){
  }
  changeSnippet(template:string){
    switch(template){
      case "Advance":
        this.code = this.findSnippet(template)
        break;
      case "Investor":
        this.code = this.findSnippet(template)
        break;
      case "GeVestor":
        this.code = this.findSnippet(template)
        break;
      case "Investor-Webinar":
        this.code = this.findSnippet(template)
        break;
      case "GeVestor-Webinar":
        this.code = this.findSnippet(template)
        break;
      case "maxLQ":
        this.code = this.findSnippet(template)
        break;
      case "maxLQ-Magdalena":
        this.code = this.findSnippet(template)
        break;
      case "Reminder & Registrierung GeVestor":
        this.code = this.findSnippet("GeVestor-Webinar")
        this.infos = this.findInfos("GeVestor-Webinar")
        break;
      case "Reminder & Registrierung Investor":
        this.code = this.findSnippet("Investor-Webinar")
        this.infos = this.findInfos("Investor-Webinar")
        break;
      case "Nachfass-Mails-XXL-Webinar":
        this.code = this.findSnippet("Advance")
        this.infos = this.findInfos("Advance")
        break;
      case "Nachfass-Mails-GeVestor":
        this.code = this.findSnippet("GeVestor-Webinar")
        this.infos = this.findInfos("GeVestor-Webinar")

        break;  
      case "Nachfass-Mails-Investor":
        this.code = this.findSnippet("Investor-Webinar")
        this.infos = this.findInfos("Investor-Webinar")
        break;
      case "HU-Mailings":
        this.code = this.findSnippet("Advance")
        this.infos = this.findInfos("Advance")
        break;
      case "Abo-laufend-Investor":
        this.code = this.findSnippet(template)
        this.infos = this.findInfos(template)
        break; 
      case "Abo-laufend-GeVestor":
        this.code = this.findSnippet(template)
        this.infos = this.findInfos(template)
        break;     
      default:this.code = "Unbekannt"
    }

    console.log(this.infos)
  }

  findSnippet(name:string) :string{
    return SNIPPETS.find(s => s.name === name)?.code || "Unbekannt"
  }
  findInfos(template:string){
    return templateInfo.find(i => i.templateName === template)?.info || ["Nicht vorhanden"] 
  }
  copyToClipboard(){
    navigator.clipboard.writeText(this.code).then(() => {
      this.snackbar.open("Code erfolgriech kopiert", "Ok", {
        duration:3000
      })
    })
  }
}
