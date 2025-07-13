import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-massage',
  imports: [CommonModule],
  templateUrl: './error-massage.component.html',
  styleUrl: './error-massage.component.css'
})
export class ErrorMassageComponent {

@Input() errorMessage:string [] =[];

constructor(){
  console.log(this.errorMessage)
}
}
