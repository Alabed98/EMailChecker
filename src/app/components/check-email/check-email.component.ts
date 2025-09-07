import { Component, OnDestroy } from '@angular/core';
import { UploadComponent } from "../upload/upload.component";
import { FixeHtmlComponent } from "../fixe-html/fixe-html.component";
import { ErrorsService } from '../../services/errors.service';
import { ErrorMassageComponent } from "../error-massage/error-massage.component";
import { NotesService } from '../../services/notes.service';
import { NotesMassageComponent } from "../notes-massage/notes-massage.component";
import { Notes } from '../../notes';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-check-email',
  imports: [UploadComponent, FixeHtmlComponent, ErrorMassageComponent, NotesMassageComponent],
  templateUrl: './check-email.component.html',
  styleUrl: './check-email.component.css'
})
export class CheckEmailComponent implements OnDestroy {
  errors !:string [];
  notes !:Notes;
  private destroy$ = new Subject<void>();
  constructor(private errorsService:ErrorsService, private notesService:NotesService) {
  }
  ngOnInit() {
    this.errorsService.currentErrors$.pipe(takeUntil(this.destroy$)).subscribe(data => {

        this.errors = data.length === 0
        ? ["Keine Probleme gefunden"]
        : data;
      })

    this.notesService.currentNotes$.pipe(takeUntil(this.destroy$)).subscribe(data=>{
      this.notes = data;
    })
  }

  ngOnDestroy(){
    this.destroy$.next()
    this.destroy$.complete()
  }
}
