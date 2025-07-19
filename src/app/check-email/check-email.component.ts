import { Component } from '@angular/core';
import { UploadComponent } from "../upload/upload.component";
import { FixeHtmlComponent } from "../fixe-html/fixe-html.component";
import { ErrorsService } from '../errors.service';
import { ErrorMassageComponent } from "../error-massage/error-massage.component";
import { NotesService } from '../notes.service';
import { NotesMassageComponent } from "../notes-massage/notes-massage.component";

@Component({
  selector: 'app-check-email',
  imports: [UploadComponent, FixeHtmlComponent, ErrorMassageComponent, NotesMassageComponent],
  templateUrl: './check-email.component.html',
  styleUrl: './check-email.component.css'
})
export class CheckEmailComponent {
  errors !:string [];
  notes !:string [];
  constructor(private errorsService:ErrorsService, private notesService:NotesService) {
    this.errorsService.currentErrors$.subscribe(data => {
      this.errors = data.length === 0
      ? ["Keine Probleme gefunden"]
      : [...data];
    })

    this.notesService.currentNotes$.subscribe(data=>{
      this.notes = data.length === 0
      ? ["Keine Hinweise gefunden"]
      : [...data];
    })
  }

}
