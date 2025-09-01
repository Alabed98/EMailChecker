import { Component, OnDestroy } from '@angular/core';
import { UploadComponent } from '../upload/upload.component';
import { ErrorsService } from '../../services/errors.service';
import { NotesService } from '../../services/notes.service';
import { ErrorMassageComponent } from "../error-massage/error-massage.component";
import { NotesMassageComponent } from "../notes-massage/notes-massage.component";
import {
  MatDialog,

} from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { Notes } from '../../notes';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-check-mail-type',
  imports: [UploadComponent, ErrorMassageComponent, NotesMassageComponent],
  templateUrl: './check-mail-type.component.html',
  styleUrl: './check-mail-type.component.css'
})
export class CheckMailTypeComponent implements OnDestroy {

  type:string ="Unbekannt"
  errors:string[] = [];
  notes:Notes = {
    header: '',
    impressum: '',
    preHeader: '',
    links: [],
    unusedImages: [],
    anotherNotes: []
  };
  private destroy$ = new Subject<void>()

  constructor(
     private errorService: ErrorsService,
     private notesService: NotesService,
     private dialog:MatDialog
  ) {}
 

  ngOnInit(){
    this.errorService.currentErrors$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.errors = data;
    })

    this.notesService.currentNotes$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.notes = data
    })
  }
  checkType2(event:string){
    console.log(event)
    this.type = event;
    if(this.type !== "Unbekannt"){
      this.openDialog();
    }
  }

  openDialog():void{
    const dialogRef =this.dialog.open(DialogComponent,{
      data:this.type,
    })
  }

  ngOnDestroy(){
    this.destroy$.next()
    this.destroy$.complete()
  }
}
