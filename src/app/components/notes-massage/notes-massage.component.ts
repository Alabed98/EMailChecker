import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notes } from '../../notes';
@Component({
  selector: 'app-notes-massage',
  imports: [CommonModule],
  templateUrl: './notes-massage.component.html',
  styleUrl: './notes-massage.component.css'
})

export class NotesMassageComponent {

  @Input() notesMassage:Notes = {  
  header: '',
  impressum: '',
  preHeader:'',
  links: [],
  unusedImages: [],
  anotherNotes: []
  };
}
