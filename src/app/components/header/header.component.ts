import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ErrorsService } from '../../services/errors.service';
import { NotesService } from '../../services/notes.service';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-header',
  imports: [RouterLink, FormsModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private errorsService:ErrorsService, private notesService: NotesService, private router:Router){}
  selectedRoute :string ="";

  deleteNotesAndErrors(event :Event){
    this.notesService.setNotes({
        header: '',
        impressum: '',
        preHeader: '',
        links: [],
        unusedImages: [],
        anotherNotes: []
    })
    if (!this.selectedRoute) return;
    this.router.navigate([this.selectedRoute]).then(() => {
      this.selectedRoute = ""
    })
  } 
}
