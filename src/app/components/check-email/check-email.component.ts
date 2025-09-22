import { Component, OnDestroy, Output,EventEmitter } from '@angular/core';
import { UploadComponent } from "../upload/upload.component";
import { FixeHtmlComponent } from "../fixe-html/fixe-html.component";
import { ErrorsService } from '../../services/errors.service';
import { ErrorMassageComponent } from "../error-massage/error-massage.component";
import { NotesService } from '../../services/notes.service';
import { NotesMassageComponent } from "../notes-massage/notes-massage.component";
import { Notes } from '../../notes';
import { Subject, takeUntil } from 'rxjs';
import { FileUploadComponent } from "../upload/file-upload/file-upload.component";
import { ValidateEmailService } from '../../services/validate-email.service';
import { EditorComponent } from "../editor/editor.component";
import { UploaderService } from '../../services/uploader.service';
import { CheckErrorsService } from '../../services/check-errors.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {CommonModule} from '@angular/common'

interface Info {
  template:string,
  fileSize:string,
  fileName:string
}

@Component({
  selector: 'app-check-email',
  imports: [UploadComponent, FixeHtmlComponent, ErrorMassageComponent, NotesMassageComponent, FileUploadComponent, EditorComponent,CommonModule],
  templateUrl: './check-email.component.html',
  styleUrl: './check-email.component.css'
})
export class CheckEmailComponent implements OnDestroy {
  errors !:string [];
  notes !:Notes;
  private destroy$ = new Subject<void>();
  @Output() checkMailTypeEvent = new EventEmitter<string>()
  textarea:string = '';
  correctedCode:string ='';
  isVisible = false;

  constructor(
    private errorsService:ErrorsService, 
    private notesService:NotesService,
    private validateService:ValidateEmailService,
    private uploader:UploaderService,
    private checkErrorsService:CheckErrorsService,
    private snackbar:MatSnackBar

  ) {
  }
  ngOnInit() {
    this.errorsService.currentErrors$.pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.errors = data.length === 0
        ? ["Keine Probleme gefunden"]
        : data;
    })

    this.notesService.currentNotes$.pipe(takeUntil(this.destroy$)).subscribe(data=>{
      this.notes = data;
    })
  }

  ngOnDestroy(){
    this.destroy$.next()
    this.destroy$.complete()
  }

  uploaded = false;
  
  info:Info = {
    template:"Unbekannt",
    fileSize:"Unbekannt",
    fileName:"Unbekannt"
  }

  async upload(file:File){
    this.uploaded = true
    if(file.name.endsWith("zip")){
      await this.validateService.validateZip(file).then(data => {this.info  =  data})
      this.info.fileName = file.name;
    }
    else if(file.name.endsWith("html")){
     await file.text().then(data => {   
        this.info = this.validateService.validate(data, "normal")
        this.checkMailTypeEvent.emit(this.validateService.validate(data, "normal").template)
      })
      this.info.fileName = file.name

    }

    this.uploader.currentData$.pipe(takeUntil(this.destroy$)).subscribe( data => {
      this.textarea = data;
    })

  }

  fixeCode(){
    this.uploader.currentData$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.correctedCode = this.checkErrorsService.correctCode(data)
    })
  }

  accordion(){
    this.isVisible = !this.isVisible;
  }

  copyCodeToClipboard(type:string){
    let code = ""
    if(type === "textarea"){
      code = this.textarea
    }
    else{
      code = this.correctedCode
    }
      navigator.clipboard.writeText(code).then(() => {
      this.snackbar.open("Code erfolgriech kopiert", "Ok", {
        duration:3000
      })
    })
  }
}
