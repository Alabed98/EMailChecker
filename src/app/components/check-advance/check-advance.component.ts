import { Component } from '@angular/core';
import { UploadComponent } from "../upload/upload.component";
import { ErrorMassageComponent } from "../error-massage/error-massage.component";
import { ErrorsService } from '../../services/errors.service';
import { NotesMassageComponent } from "../notes-massage/notes-massage.component";
import { NotesService } from '../../services/notes.service';
import { Notes } from '../../notes';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-check-advance',
  imports: [UploadComponent, ErrorMassageComponent, NotesMassageComponent],
  templateUrl: './check-advance.component.html',
  styleUrl: './check-advance.component.css'
})
export class CheckAdvanceComponent {

  errors:string[] = [];
  notes:Notes = {
    header: '',
    impressum: '',
    preHeader:'',
    links: [],
    unusedImages: [],
    anotherNotes: []
  };
  constructor(
    private errorsService:ErrorsService, 
    private notesService:NotesService,
    private snackbar:MatSnackBar
  ){
    this.errorsService.currentErrors$.subscribe(data =>{
      if(data[0] != "Textarea ist leer"){
        this.errors = data;
      }
    }) 

    this.notesService.currentNotes$.subscribe(data=>{
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

}

