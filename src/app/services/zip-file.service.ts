import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface FileData{
 file:string []
 images:string [] 
}

@Injectable({
  providedIn: 'root'
})

export class ZipFileService {
  
  constructor() { }
  data : BehaviorSubject<FileData>  = new BehaviorSubject<FileData>({file:[], images:[]})
  currentData$ = this.data.asObservable();

  setData(fileData:FileData){
    this.data.next(fileData);
  }

  deleteData(){
    this.data.next({file:[], images:[]})
  }
}
