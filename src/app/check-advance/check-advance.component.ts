import { Component } from '@angular/core';
import { UploadComponent } from "../upload/upload.component";
import { ErrorMassageComponent } from "../error-massage/error-massage.component";
import { ErrorsService } from '../services/errors.service';
import { NotesMassageComponent } from "../notes-massage/notes-massage.component";
import { NotesService } from '../services/notes.service';
import { Notes } from '../notes';

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
    links: [],
    unusedImages: [],
    anotherNotes: []
  };
  constructor(private errorsService:ErrorsService, private notesService:NotesService){
    this.errorsService.currentErrors$.subscribe(data =>{
      this.errors = data;
    })

    this.notesService.currentNotes$.subscribe(data=>{
      this.notes.header = data.header;
      this.notes.impressum = data.impressum;
      this.notes.links = data.links;
      this.notes.unusedImages = data.unusedImages;
      this.notes.anotherNotes = data.anotherNotes

    })
  }
}
