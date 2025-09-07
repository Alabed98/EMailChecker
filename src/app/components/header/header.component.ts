import { Component, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ErrorsService } from '../../services/errors.service';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private errorsService:ErrorsService, private notesService: NotesService, private router:Router){}

  deleteNotesAndErrors(event :Event){
    this.notesService.setNotes({
        header: '',
        impressum: '',
        preHeader: '',
        links: [],
        unusedImages: [],
        anotherNotes: []
    })
    this.errorsService.setErrors([])

    let component = (event.target as HTMLSelectElement).value

    if(component){
      this.router.navigate([component])
    }
  } 
}
