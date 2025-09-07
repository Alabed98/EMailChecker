import { Component, OnDestroy } from '@angular/core';
import { UploadComponent } from "../upload/upload.component";
import { ErrorMassageComponent } from "../error-massage/error-massage.component";
import { ErrorsService } from '../../services/errors.service';
import { NotesMassageComponent } from "../notes-massage/notes-massage.component";
import { NotesService } from '../../services/notes.service';
import { Notes } from '../../notes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-check-advance',
  imports: [UploadComponent, ErrorMassageComponent, NotesMassageComponent,CommonModule],
  templateUrl: './check-advance.component.html',
  styleUrl: './check-advance.component.css'
})
export class CheckAdvanceComponent implements OnDestroy {

  errors:string[] = [];
  notes:Notes = {
    header: '',
    impressum: '',
    preHeader:'',
    links: [],
    unusedImages: [],
    anotherNotes: []
  };

  private destroy$ = new Subject<void>();
  
  constructor(
    private errorsService:ErrorsService, 
    private notesService:NotesService,
    private snackbar:MatSnackBar
  ){
    this.errorsService.currentErrors$.pipe(takeUntil(this.destroy$)).subscribe(data =>{
      if(data[0] != "Textarea ist leer"){
        this.errors = data;
      }
    }) 

    this.notesService.currentNotes$.pipe(takeUntil(this.destroy$)).subscribe(data=>{
      this.notes = {...data}

   if(
      this.notes.header === "{header}" &&
      this.notes.impressum === "{footer}" &&
      this.notes.links.includes("{landingpageUrl}") &&
      this.notes.preHeader === ("{preHeader}")      
      ){
      this.snackbar.open(
        "Advance-Platzhalter werden verwendet", 
        "Ok", 
        {duration:4000, panelClass: ['green-snackbar', 'login-snackbar']})
      }
    })
  }

  ngOnDestroy(){
    this.destroy$.next()
    this.destroy$.complete()
  }
}

