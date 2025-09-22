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
import { Subject, takeUntil } from 'rxjs';
import { CheckErrorsService } from '../../services/check-errors.service';


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
    private validateService: ValidateEmailService,
    private uploader:UploaderService,
    private checkErrorsService:CheckErrorsService
  ) {
     this.uploader.currentData$.pipe(takeUntil(this.destroy$)).subscribe( data => {
      this.textarea = data;
    })
  }
  private destroy$ = new Subject<void>()
  @Output() checkMailTypeEvent = new EventEmitter<string>()

  /*async upload(file:File | string ){
    if(file instanceof File){
      this.validateService.validateZip(file)
    }
    else if(typeof file === "string"){
     this.checkMailTypeEvent.emit(this.validateService.validate(file, this.emailType))
    }
    this.uploader.currentData$.pipe(takeUntil(this.destroy$)).subscribe( data => {
      this.textarea = data;
    })
  }*/

  ngOnDestroy(){
    this.destroy$.next()
    this.destroy$.complete()
  }

    fixeCode(){
    let content = ""
    this.uploader.currentData$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      content = this.checkErrorsService.correctCode(data)
    })
  }
}
