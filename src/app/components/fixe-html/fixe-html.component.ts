import { Component, OnDestroy } from '@angular/core';
import { ValidateEmailService } from '../../services/validate-email.service';
import { UploaderService } from '../../services/uploader.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { EditorComponent } from '../editor/editor.component';
import { CheckErrorsService } from '../../services/check-errors.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-fixe-html',
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, CommonModule,EditorComponent],
  templateUrl: './fixe-html.component.html',
  styleUrl: './fixe-html.component.css'
})
export class FixeHtmlComponent implements OnDestroy {
  
  textarea:string = "";
  private destroy$ = new Subject<void>()
  notes:string[]=[];

  constructor(
    private uploader: UploaderService,
    private checkErrorsService:CheckErrorsService
  )
  {
    this.uploader.currentData$.subscribe(data=> {
      this.textarea = ""
    })
  }

   fixeCode(){
    let content = ""
    this.uploader.currentData$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      content = this.checkErrorsService.correctCode(data)
    })
    this.textarea = content
  }
  ngOnDestroy(){
    this.destroy$.next()
    this.destroy$.complete()
  }
}
