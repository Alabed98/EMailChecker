import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from "@ctrl/ngx-codemirror";
import 'codemirror/mode/javascript/javascript';
import { UploaderService } from '../services/uploader.service';
import { ValidateEmailService } from '../services/validate-email.service';

@Component({
  selector: 'app-editor',
   imports: [FormsModule, CodemirrorModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {

  codemirrorOptions :any = {
    theme:'abcdef',
    mode:'javascript',
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
  }
 
  @Input() content!:string;
  @Input() emailType!:string;
  
  constructor(private validateService:ValidateEmailService, private uploader:UploaderService){}
  
  checkErrors(){
    this.validateService.validate(this.content, this.emailType)
    this.uploader.getData(this.content)
  }

}
