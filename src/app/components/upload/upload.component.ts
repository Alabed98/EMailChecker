import { Component, Input, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ValidateEmailService } from '../../services/validate-email.service';
import { CommonModule } from '@angular/common';
import { UploaderService } from '../../services/uploader.service';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { EditorComponent } from "../../components/editor/editor.component";
import { NotesService } from '../../services/notes.service';


export class AppModule {}

@Component({
  selector: 'app-upload',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    FileUploadComponent,
    CodemirrorModule,
    EditorComponent
],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
  encapsulation: ViewEncapsulation.None
})
export class UploadComponent {
  textarea:string = '';

  @Input() emailType:string = "normal";

  constructor(
    private validateService: ValidateEmailService, private notesService:NotesService,
    private uploader:UploaderService,
  ) {
  }

  @Output() newItemEvent = new EventEmitter<string>()

  ngOnInit(){
    this.uploader.currentData$.subscribe(data => {
      this.newItemEvent.emit(this.validateService.validate(data, this.emailType)[1]);
      this.textarea = data
    })
  }

}
