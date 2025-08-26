import { Component } from '@angular/core';
import { UploadComponent } from "../upload/upload.component";
import { FixeHtmlComponent } from "../fixe-html/fixe-html.component";
import { ErrorsService } from '../services/errors.service';
import { ErrorMassageComponent } from "../error-massage/error-massage.component";
import { NotesService } from '../services/notes.service';
import { NotesMassageComponent } from "../notes-massage/notes-massage.component";
import { Notes } from '../notes';

@Component({
  selector: 'app-check-email',
  imports: [UploadComponent, FixeHtmlComponent, ErrorMassageComponent, NotesMassageComponent],
  templateUrl: './check-email.component.html',
  styleUrl: './check-email.component.css'
})
export class CheckEmailComponent {
  errors !:string [];
  notes !:Notes;

  constructor(private errorsService:ErrorsService, private notesService:NotesService) {
  }
  ngOnInit() {
    this.errorsService.currentErrors$.subscribe(data => {

        this.errors = data.length === 0 //|| data[0] === "Textarea ist leer"
        ? ["Keine Probleme gefunden"]
        : data;
      })

    this.notesService.currentNotes$.subscribe(data=>{
      this.notes = data;

    })
  }
}
