import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadComponent } from "./upload/upload.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FixeHtmlComponent } from "./fixe-html/fixe-html.component";
import { HeaderComponent } from "./header/header.component";
import { CheckAdvanceComponent } from './check-advance/check-advance.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UploadComponent, MatSlideToggleModule, FixeHtmlComponent, HeaderComponent, CheckAdvanceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  title = 'email_checker';
  
}
