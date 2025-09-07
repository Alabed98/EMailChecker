import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SNIPPETS } from '../../templates';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditorComponent } from "../editor/editor.component";

@Component({
  selector: 'app-code-snippets',
  imports: [FormsModule, EditorComponent],
  templateUrl: './code-snippets.component.html',
  styleUrl: './code-snippets.component.css'
})
export class CodeSnippetsComponent {
  code:string = "";
  infos:string = "";

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
        break;
      case "Reminder & Registrierung Investor":
        this.code = this.findSnippet("Investor-Webinar")
        break;
      case "Nachfass-Mails-XXL-Webinar":
        this.code = this.findSnippet("Advance")
        break;
      case "Nachfass-Mails-GeVestor":
        this.code = this.findSnippet("GeVestor-Webinar")
        break;  
      case "Nachfass-Mails-Investor":
        this.code = this.findSnippet("Investor-Webinar")
        break;
      case "HU-Mailings":
        this.code = this.findSnippet("Advance")
        break;
      case "Abo-laufend-Investor":
        this.code = this.findSnippet(template)
        break; 
      case "Abo-laufend-GeVestor":
        this.code = this.findSnippet(template)
        break;     
      default:this.code = "Unbekannt"
    }
  }

  findSnippet(name:string) :string{
    return SNIPPETS.find(s => s.name === name)?.code || "Unbekannt"
  }

  copyToClipboard(){
    navigator.clipboard.writeText(this.code).then(() => {
      this.snackbar.open("Code erfolgriech kopiert", "Ok", {
        duration:3000
      })
    })
  }
}
