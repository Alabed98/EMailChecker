import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor() { }

  errors = new BehaviorSubject<string []>([]);
  currentErrors$ = this.errors.asObservable();

  getErrors(errors:string []){
      this.errors.next(errors)
  }
}
