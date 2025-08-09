import { Component } from '@angular/core';
import { UploadComponent } from '../upload/upload.component';
import { ErrorMassageComponent } from '../error-massage/error-massage.component';
@Component({
  selector: 'app-check-mail-type',
  imports: [UploadComponent,ErrorMassageComponent],
  templateUrl: './check-mail-type.component.html',
  styleUrl: './check-mail-type.component.css'
})
export class CheckMailTypeComponent {
  type:String ="Unbekannt"

  checkType2(event:String){
    this.type = event;
  }
}
