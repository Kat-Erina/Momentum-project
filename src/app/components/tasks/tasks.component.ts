import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Department, Employee, Priority, Task } from '../../core/models/models';
import { StatusComponent } from "../../core/components/status/status.component";
import { TaskCardComponent } from './task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { FiltersDropdownComponent } from "./filters-dropdown/filters-dropdown.component";
import { SharedService } from '../../core/services/shared.service';

@Component({
  selector: 'app-tasks',
  imports: [StatusComponent, TaskCardComponent, CommonModule, FiltersDropdownComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit{
apiService=inject(ApiService);
tasks=signal<Task[]>([]);
service=inject(SharedService)

departmentIsOpen=signal(false)
priorityIsOpen=signal(false)
employyesAreOpen=signal(false)

// aboutToStartTsks=signal<Task[]>([]);
// inProgressTsks=signal<Task[]>([]);
// readyForTestingTasks=signal<Task[]>([]);
// finishedTasks=signal<Task[]>([])

// data=signal<Priority[]| Department[]| Employee[]>([])

departments=signal<Department[]>([])
allEmployees=signal<Employee[]>([])
priorities=signal<Priority[]>([])
data=this.service.data

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
    this.departmentIsOpen.set(!this.departmentIsOpen())
    if(this.departmentIsOpen()){
      this.service.filtersDropdownOpen.set(true)
    }
    this.priorityIsOpen.set(false)
    this.employyesAreOpen.set(false)
    this.service.getDepartments()
  }
  if(chosen==="priorities"){
    this.priorityIsOpen.set(!this.priorityIsOpen())
    if(this.priorityIsOpen()){
      this.service.filtersDropdownOpen.set(true)
    }
    this.departmentIsOpen.set(false)
    this.employyesAreOpen.set(false)
    this.service.getPriorities()
    }
    if(chosen==="employees"){
      this.employyesAreOpen.set(!this.employyesAreOpen())
      if(this.employyesAreOpen()){
        this.service.filtersDropdownOpen.set(true)
      }
      this.priorityIsOpen.set(false)
      this.departmentIsOpen.set(false)
      this.service.getAllEmployees()
} }
 


  ngOnInit(): void {
    this.loadallTasks();

  }
}
