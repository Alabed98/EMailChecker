import { Component, Input, ViewEncapsulation, Output, EventEmitter, OnDestroy} from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';


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
export class UploadComponent implements OnDestroy {
  textarea:string = '';

  @Input() emailType:string = "normal";

  constructor(
    private validateService: ValidateEmailService, private notesService:NotesService,
    private uploader:UploaderService,
  ) {
  }
  private destroy$ = new Subject<void>()
  @Output() checkMailTypeEvent = new EventEmitter<string>()

  ngOnInit(){
    //this.uploader.currentData$.pipe(takeUntil(this.destroy$)).subscribe( data => {
      //this.checkMailTypeEvent.emit(this.validateService.validate(data, this.emailType))
     // this.textarea = data  
    //})
  }

  async upload(file:File | string ){
    if(file instanceof File){
      this.validateService.validateZip(file)
      console.log("zipFile logik")
    }
    else if(typeof file === "string"){
     this.checkMailTypeEvent.emit(this.validateService.validate(file, this.emailType))
    }
    this.uploader.currentData$.pipe(takeUntil(this.destroy$)).subscribe( data => {
      this.textarea = data;
    })
  }


  ngOnDestroy(){
    this.destroy$.next()
    this.destroy$.complete()
  }
}
