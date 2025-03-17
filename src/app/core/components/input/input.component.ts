import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal, Signal } from '@angular/core';
import {   FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
@Input() formSubmited!:Signal<boolean>
@Input() labelValue!:string
@Input() model!:string
@Output() modelChange  = new EventEmitter<string>(); 



focused=signal(false)
onInputChange(value: string) {
  this.focused.set(true)
  this.modelChange.emit(value); 
}

}
