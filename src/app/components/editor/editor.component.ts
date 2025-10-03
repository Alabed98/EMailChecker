import { Component, Input, ViewChild, AfterViewInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule,CodemirrorComponent  } from "@ctrl/ngx-codemirror";
import 'codemirror/mode/javascript/javascript';
import { UploaderService } from '../../services/uploader.service';
import { ValidateEmailService } from '../../services/validate-email.service';

@Component({
  selector: 'app-editor',
   imports: [FormsModule, CodemirrorModule ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements AfterViewInit {

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
 @ViewChild('editor') editorComponent: any;

  @Input() content!:string;
  @Input() emailType!:string;
  
  constructor(private validateService:ValidateEmailService, private uploader:UploaderService){}

  checkErrors(){
    this.validateService.validate(this.content, this.emailType)
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.editorComponent.codeMirror.refresh();
    }, 50);
  }
}
