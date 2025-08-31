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
  preHeader: '',
  links: [],
  unusedImages: [],
  anotherNotes: []
});
  currentNotes$ = this.notes.asObservable();

  setNotes(notes:Notes){
    this.notes.next(notes)
  }

  getValue(){
    return this.notes.getValue()
  }
  updateHeader(newNotes:Notes){
    let newData :Notes= {...this.getValue(), ...newNotes}

    this.setNotes(newData)
  }

}
