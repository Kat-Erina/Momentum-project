import { Component,  inject, Input, Signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../../core/services/filter-service.service';
import { SharedService } from '../../../core/services/shared.service';
import { Department } from '../../../core/models/models';

@Component({
  selector: 'app-filters-dropdown',
  imports: [CommonModule, FormsModule],
  templateUrl: './filters-dropdown.component.html',
  styleUrl: './filters-dropdown.component.scss'
})
export class FiltersDropdownComponent  {
  filtersService=inject(FilterService)
  sharedService=inject(SharedService)
  @Input() data!: Signal<any[]>;
  @Input() target!:string


addCriteria(criteria: string, criteriasArray:WritableSignal<any[]>) {
  let item;
if(this.target==="departments"){
item=this.sharedService.departments().filter(dep=>dep.id.toString()===criteria)
}
if(this.target==="priorities"){
  item=this.sharedService.priorities().filter(dep=>dep.id.toString()===criteria)
  }
  if(this.target==="employees"){
    item=this.sharedService.allEmployees().filter(dep=>dep.id.toString()===criteria)
    }
const items=criteriasArray().filter(i => i.id == item![0].id || i.name == item![0].name)
if(items.length===0){
criteriasArray.set([...criteriasArray(), item![0]])
} else {
  criteriasArray.set(criteriasArray().filter(i => i.id !== item![0].id || i.name !== item![0].name))
  return
}
console.log(criteriasArray())
}

getValue(event:Event){
 const target=event.target as HTMLInputElement;
 if(this.target==='departments'){
  this.addCriteria(target.value, this.filtersService.departmentsFiltersCriterias);
  this.filtersService.fileteringCriterias.update(
    currentData=>({
      ...currentData, 
      departments: [...this.filtersService.departmentsFiltersCriterias()] 
    })
  )
 }
 if(this.target==='priorities'){
 this.addCriteria(target.value, this.filtersService.prioritiesFiltersCriterias)
this.filtersService.fileteringCriterias.update(
    currentData=>({
      ...currentData, 
      priorities: [...this.filtersService.prioritiesFiltersCriterias()] 
    })
  )
  }
  if(this.target==='employees'){
    this.addCriteria(target.value, this.filtersService.employeesFiltersCriterias)
    this.filtersService.fileteringCriterias.update(
      currentData=>({
        ...currentData, 
        employees: [...this.filtersService.employeesFiltersCriterias()] 
      })
    )
    this.filtersService.employyesAreOpen.set(false)
    }
}

filter(){
  this.filtersService.filter(this.sharedService.aboutToStartTsks,this.filtersService.fileteringCriterias);
  this.filtersService.filter(this.sharedService.inProgressTsks,this.filtersService.fileteringCriterias)
  this.filtersService.filter(this.sharedService.readyForTestingTasks,this.filtersService.fileteringCriterias)
  this.filtersService.filter(this.sharedService.finishedTasks,this.filtersService.fileteringCriterias)
  this.sharedService.filtersDropdownOpen.set(false);

  if(this.target==='departments'){
    this.filtersService.departmentIsOpen.set(false);
    this.filtersService.addUniqueItems(this.filtersService.fileteringCriterias().departments);
  }
  if(this.target==='priorities'){
    this.filtersService.priorityIsOpen.set(false);
    this.filtersService.addUniqueItems(this.filtersService.fileteringCriterias().priorities);
  }
  if(this.target==='employees'){
    this.filtersService.employyesAreOpen.set(false);
    this.filtersService.array.set(
      [...new Map(
        [...this.filtersService.array(), ...this.filtersService.fileteringCriterias().employees]
          .map(item => [item?.id, item]) 
      ).values()]
    );
  }
 }
  }
