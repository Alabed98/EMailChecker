import { Component } from '@angular/core';
import { UploadComponent } from "../upload/upload.component";
import { ErrorMassageComponent } from "../error-massage/error-massage.component";
import { ErrorsService } from '../errors.service';
import { NotesMassageComponent } from "../notes-massage/notes-massage.component";
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-check-advance',
  imports: [UploadComponent, ErrorMassageComponent, NotesMassageComponent],
  templateUrl: './check-advance.component.html',
  styleUrl: './check-advance.component.css'
})
export class CheckAdvanceComponent {

  errors:string[] = [];
  notes:string [] = [];
  constructor(private errorsService:ErrorsService, private notesService:NotesService){
    this.errorsService.currentErrors$.subscribe(data =>{
      this.errors = data;
    })

    this.notesService.currentNotes$.subscribe(data=>{
      this.notes = data;
    })
  }
}
