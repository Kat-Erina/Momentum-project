import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal, Signal } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
@Input() label!:string
@Input() formSubmited!:Signal<boolean>
@Input() dropDownTarget!:string
@Input() data!:Signal<any[]>
@Input() selectedOption!:Signal<any>
@Input() dropdownOpen=signal(false);
@Output() selectEmitter=new EventEmitter<any>()
@Input() customclass!:string
@Output() toggleDropdown=new EventEmitter<any>()

handleToggle(option:any){
  console.log(option)
 this.toggleDropdown.emit(option)
 this.dropdownOpen.set(!this.dropdownOpen())
}
selectOption(option: any, chosenField:string){
  this.selectEmitter.emit({option, chosenField})
}
}
