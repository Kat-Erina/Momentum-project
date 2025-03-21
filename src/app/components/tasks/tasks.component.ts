import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Department, Employee, Priority, Task } from '../../core/models/models';
import { StatusComponent } from "../../core/components/status/status.component";
import { TaskCardComponent } from './task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { FiltersDropdownComponent } from "./filters-dropdown/filters-dropdown.component";
import { SharedService } from '../../core/services/shared.service';
import { FilterService } from '../../core/services/filter-service.service';
import { FilterCriteriaComponent } from "./filter-criteria/filter-criteria.component";
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-tasks',
  imports: [StatusComponent, TaskCardComponent, CommonModule, FiltersDropdownComponent, FilterCriteriaComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit{
filtersService=inject(FilterService)
apiService=inject(ApiService);
service=inject(SharedService)
departments=signal<Department[]>([])
allEmployees=signal<Employee[]>([])
priorities=signal<Priority[]>([])
data=this.service.data
target=signal('')

constructor(private router: Router) {
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      if (event.url!=('/')) {
      this.clearfilters()
      this.filtersService.array.set([])
      }
    });
}

loadallTasks(){
  this.apiService.getAllTasks().subscribe({
    next:(response)=>{
      this.service.allTasks.set(response)
      this.service.storedTasks.set(response)
      this.service.aboutToStartTsks.set(this.service.allTasks().filter(task=>{
        return task.status.name==="დასაწყები"
      })
    )
    this.filtersService.filter(this.service.aboutToStartTsks,this.filtersService.fileteringCriterias);
      this.service.inProgressTsks.set(this.service.allTasks().filter(task=>{
        return task.status.name==="პროგრესში"
      }))
      this.filtersService.filter(this.service.inProgressTsks,this.filtersService.fileteringCriterias)
      this.service.readyForTestingTasks.set(this.service.allTasks().filter(task=>{
        return task.status.name==="მზად ტესტირებისთვის"
      }))
      this.filtersService.filter(this.service.readyForTestingTasks,this.filtersService.fileteringCriterias)

      this.service.finishedTasks.set(this.service.allTasks().filter(task=>{
        return task.status.name==="დასრულებული"
      }))
      this.filtersService.filter(this.service.finishedTasks,this.filtersService.fileteringCriterias)

    }
  })
}

opendropdown(chosen:string){
  this.service.filtersDropdownOpen.set(false)
  if(chosen==="departments"){
    this.target.set('departments')
    this.filtersService.departmentIsOpen.set(!this.filtersService.departmentIsOpen())
    if(this.filtersService.departmentIsOpen()){
      this.service.filtersDropdownOpen.set(true)
    }
    this.filtersService.priorityIsOpen.set(false)
    this.filtersService.employyesAreOpen.set(false)
    this.service.getDepartments()
  }
  if(chosen==="priorities"){
    this.target.set('priorities')
    this.filtersService.priorityIsOpen.set(!this.filtersService.priorityIsOpen())
    if(this.filtersService.priorityIsOpen()){
      this.service.filtersDropdownOpen.set(true)
    }
    this.filtersService.departmentIsOpen.set(false)
    this.filtersService.employyesAreOpen.set(false)
    this.service.getPriorities()
    }
    if(chosen==="employees"){
      this.target.set('employees')
      this.filtersService.employyesAreOpen.set(!this.filtersService.employyesAreOpen())
      if(this.filtersService.employyesAreOpen()){
        this.service.filtersDropdownOpen.set(true)
      }
      this.filtersService.priorityIsOpen.set(false)
      this.filtersService.departmentIsOpen.set(false)
      this.service.getAllEmployees()
} }
 
clearfilters(){
  this.filtersService.array.set([])
  this.filtersService.fileteringCriterias.set({
    priorities:[], 
    departments:[], 
    employees:[]
})
this.loadallTasks()
}

  ngOnInit(): void {
    // localStorage.clear()
    this.loadallTasks();
    let fetchedData=localStorage.getItem('filters');
    if(fetchedData){
      let data=JSON.parse(fetchedData);
      this.filtersService.fileteringCriterias.set(data)
      let data2=[...this.filtersService.fileteringCriterias().departments, ...this.filtersService.fileteringCriterias().priorities,
        ...this.filtersService.fileteringCriterias().employees];
        this.filtersService.array.set(data2)

    }
  }

  navigateToTask(taskId: number) {
    this.router.navigate(['/task', taskId]); }

}
