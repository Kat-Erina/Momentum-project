import { Component, inject, Input } from '@angular/core';
import { FilterService } from '../../../core/services/filter-service.service';
import { SharedService } from '../../../core/services/shared.service';
// import { FilterService } from '../../../core/services/filter-service.service';

@Component({
  selector: 'app-filter-criteria',
  standalone:true,
  imports: [],
  templateUrl: './filter-criteria.component.html',
  styleUrl: './filter-criteria.component.scss'
})
export class FilterCriteriaComponent {
@Input() item:any={};
filtersService=inject(FilterService)
sharedService=inject(SharedService)

click(itemToRemove: { id: string; name: string }) {
  let data=this.filtersService.array().filter(item=>item?.name!==itemToRemove.name && item?.id.toString()!==itemToRemove.id);
 this.filtersService.array.set(data)
  this.filtersService.fileteringCriterias.update(currentData => ({
    priorities: currentData.priorities.filter(
      item => item.id !== Number(itemToRemove.id) || item.name !== itemToRemove.name
    ),
    departments: currentData.departments.filter(
      item => item.id !== Number(itemToRemove.id) || item.name !== itemToRemove.name
    ),
    employees: currentData.employees.filter(
      item => item.id !== Number(itemToRemove.id) || item.name !== itemToRemove.name
    )
  }));

  this.sharedService.aboutToStartTsks.set(this.sharedService.allTasks().filter(task=>{
    return task.status.name==="დასაწყები"
  }))
  this.sharedService.inProgressTsks.set(this.sharedService.allTasks().filter(task=>{
    return task.status.name==="პროგრესში"
  }))
      this.sharedService.readyForTestingTasks.set(this.sharedService.allTasks().filter(task=>{
        return task.status.name==="მზად ტესტირებისთვის"
      }))
      this.sharedService.finishedTasks.set(this.sharedService.allTasks().filter(task=>{
        return task.status.name==="დასრულებული"
      }))
  this.filtersService.filter(this.sharedService.aboutToStartTsks,this.filtersService.fileteringCriterias);
  this.filtersService.filter(this.sharedService.inProgressTsks,this.filtersService.fileteringCriterias)
  this.filtersService.filter(this.sharedService.readyForTestingTasks,this.filtersService.fileteringCriterias)
  this.filtersService.filter(this.sharedService.finishedTasks,this.filtersService.fileteringCriterias)

  localStorage.setItem('filters', JSON.stringify(this.filtersService.fileteringCriterias()))
 
}
}
