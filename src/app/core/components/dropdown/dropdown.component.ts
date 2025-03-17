import { Component, EventEmitter, Input, Output, signal, Signal } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone:true,
  imports: [],
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

toggleDropdown(option:string){
  console.log(option)
  this.dropdownOpen.set(!this.dropdownOpen())
}
selectOption(option: any, chosenField:string){
  console.log(option,chosenField )
  this.selectEmitter.emit({option, chosenField})
}
}
