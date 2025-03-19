import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Department, Employee, Priority, Task } from '../../core/models/models';
import { StatusComponent } from "../../core/components/status/status.component";
import { TaskCardComponent } from './task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { FiltersDropdownComponent } from "./filters-dropdown/filters-dropdown.component";
import { SharedService } from '../../core/services/shared.service';
import { FilterService } from '../../core/services/filter-service.service';
import { ShortenTextPipe } from '../../pipes/pipes/shorten-text.pipe';

@Component({
  selector: 'app-tasks',
  imports: [StatusComponent, TaskCardComponent, CommonModule, FiltersDropdownComponent, ShortenTextPipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit{
filtersService=inject(FilterService)
apiService=inject(ApiService);
tasks=signal<Task[]>([]);
service=inject(SharedService)


departments=signal<Department[]>([])
allEmployees=signal<Employee[]>([])
priorities=signal<Priority[]>([])
data=this.service.data

target=signal('')
loadallTasks(){
  this.apiService.getAllTasks().subscribe({
    next:(response)=>{
      this.tasks.set(response)
      this.service.aboutToStartTsks.set(this.tasks().filter(task=>{
        return task.status.name==="დასაწყები"
      }))
      this.service.inProgressTsks.set(this.tasks().filter(task=>{
        return task.status.name==="პროგრესში"
      }))
      this.service.readyForTestingTasks.set(this.tasks().filter(task=>{
        return task.status.name==="მზად ტესტირებისთვის"
      }))
      this.service.finishedTasks.set(this.tasks().filter(task=>{
        return task.status.name==="დასრულებული"
      }))
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
 


  ngOnInit(): void {
    this.loadallTasks();

  }
}
