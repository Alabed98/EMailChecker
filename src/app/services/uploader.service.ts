import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {
  private data = new BehaviorSubject<string>("");
  currentData$ = this.data.asObservable();

  constructor() { }
  
  getData(file:string){
    this.data.next(file)
  }

  deleteUpload(){
    this.data.next("");
  }
}
