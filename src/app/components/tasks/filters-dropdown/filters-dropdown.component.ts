import { Component, Input, OnInit, signal, Signal } from '@angular/core';
import { Department, Employee, Priority } from '../../../core/models/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters-dropdown',
  imports: [CommonModule, FormsModule],
  templateUrl: './filters-dropdown.component.html',
  styleUrl: './filters-dropdown.component.scss'
})
export class FiltersDropdownComponent  {
  @Input() data!: Signal<any[]>;

choose(){
  console.log(this.data(), 'clicked')

}

getValue(event:Event){
 const target=event.target as HTMLInputElement;
 console.log(target, target.value)
  console.log('clicked')
  console.log(event)
}

}
