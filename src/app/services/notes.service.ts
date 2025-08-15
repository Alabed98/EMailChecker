import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notes } from '../notes';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() { }
  private notes = new BehaviorSubject<Notes>({  
  header: '',
  impressum: '',
  links: [],
  unusedImages: [],
  anotherNotes: []
});
  currentNotes$ = this.notes.asObservable();
/*
  getNotes(notes: []){
    this.notes.next(notes);
  }

  getValue(){
    return this.notes.getValue()
  }
  */

  setNotes(notes:Notes){
    this.notes.next(notes)
  }

  getValue(){
    return this.notes.getValue()
  }

}
