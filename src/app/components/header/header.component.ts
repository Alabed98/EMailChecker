import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ErrorsService } from '../../services/errors.service';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private errorsService:ErrorsService, private notesService: NotesService){}
  deleteNotesAndErrors(){
    this.notesService.setNotes({
        header: '',
        impressum: '',
        preHeader: '',
        links: [],
        unusedImages: [],
        anotherNotes: []
    })
    this.errorsService.setErrors([])
  } 
}
