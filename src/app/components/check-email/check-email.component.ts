import { Component, OnDestroy, Output,EventEmitter } from '@angular/core';
import { UploadComponent } from "../upload/upload.component";
import { FixeHtmlComponent } from "../fixe-html/fixe-html.component";
import { ErrorsService } from '../../services/errors.service';
import { ErrorMassageComponent } from "../error-massage/error-massage.component";
import { NotesService } from '../../services/notes.service';
import { NotesMassageComponent } from "../notes-massage/notes-massage.component";
import { Notes } from '../../notes';
import { retry, Subject, takeUntil, timeout } from 'rxjs';
import { FileUploadComponent } from "../upload/file-upload/file-upload.component";
import { ValidateEmailService } from '../../services/validate-email.service';
import { EditorComponent } from "../editor/editor.component";
import { UploaderService } from '../../services/uploader.service';
import { CheckErrorsService } from '../../services/check-errors.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {CommonModule} from '@angular/common'
import { ZipFileService } from '../../services/zip-file.service';

interface Info {
  template:string,
  fileSize:string,
  fileName:string
}
interface FileData{
  file:string[]
  images:string[]
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
  closeButton = false;
  zipFileData!:FileData;

  constructor(
    private errorsService:ErrorsService, 
    private notesService:NotesService,
    private validateService:ValidateEmailService,
    private uploader:UploaderService,
    private checkErrorsService:CheckErrorsService,
    private snackbar:MatSnackBar,
    private ZipFileService:ZipFileService

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

    this.closeButton = this.textarea.length> 0 ? false:true;
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
    this.closeButton = this.textarea.length> 0 ? false:true;
    this.ZipFileService.currentData$.subscribe(
      data => {
        this.zipFileData = data
      }
    )
  }

  fixeCode(){
    let content = ""
    this.uploader.currentData$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      content = data;
    })

    this.correctedCode = this.checkErrorsService.correctCode(content)

    const parser = new DOMParser();
    this.checkErrorsService.checkErrors(this.correctedCode, parser.parseFromString(this.correctedCode, "text/html"))

    let snackbarBackgroundColor:string = this.errors[0] === "Keine Probleme gefunden" ? "green-snackbar" : "red-snackbar";
    let notesMassage;
    if(this.errors[0] === "Keine Probleme gefunden"){

      this.snackbar.open(
      "Super! Alle Fehler sind behoben",
      "Ok", 
      {duration:10000, panelClass:[snackbarBackgroundColor]}
      )
    }
    else{
      this.snackbar.open(
      "Einige Fehler sind noch nicht behoben:\n" + 
      this.errors.join('\n'), 
      "Ok", 
      {duration:10000, panelClass:[snackbarBackgroundColor]}
      )
    }
    this.closeButton = this.textarea.length> 0 ? false:true;
  }

  uploadState(state:boolean){
    if(state){
      this.correctedCode = "";
      this.uploaded=false
    } 
  }

  deleteNotes(){
    this.uploaded=false
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
