import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() { }
  private notes = new BehaviorSubject<string []>([]);
  currentNotes$ = this.notes.asObservable();

  getNotes(notes:string []){
    this.notes.next(notes);
  }

  getValue(){
    return this.notes.getValue()
  }
}
