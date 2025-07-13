import { Component } from '@angular/core';
import { UploadComponent } from "../upload/upload.component";
import { FixeHtmlComponent } from "../fixe-html/fixe-html.component";

@Component({
  selector: 'app-check-email',
  imports: [UploadComponent, FixeHtmlComponent],
  templateUrl: './check-email.component.html',
  styleUrl: './check-email.component.css'
})
export class CheckEmailComponent {

}
