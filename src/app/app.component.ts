import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HeaderComponent } from "./components/header/header.component";
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule, HeaderComponent, CodemirrorModule
   ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  title = 'email_checker';
  
}
