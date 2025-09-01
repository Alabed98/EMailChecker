import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor() { }

  errors = new BehaviorSubject<string []>([]);
  currentErrors$ = this.errors.asObservable();

  setErrors(errors:string []){
    //console.log('setErrors() aufgerufen mit:', errors);
    this.errors.next(errors)
  }
}
