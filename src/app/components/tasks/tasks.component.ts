import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-tasks',
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit{
apiService=inject(ApiService);

loadallTasks(){
  this.apiService.getAllTasks().subscribe(response=>{
    console.log(response)
  })
}
loadStatuses(){
  this.apiService.getStatuses().subscribe(resp=>console.log(resp))
}

loadPriorities(){
  this.apiService.getPriorities().subscribe(resp=>console.log(resp))
}
loadDepartments(){
  this.apiService.getDepartments().subscribe(resp=>console.log(resp))
}

loadEmployees(){
  this.apiService.getEmployees().subscribe(resp=>console.log(resp))
}
  ngOnInit(): void {
    this.loadallTasks();
    this.loadStatuses()
    this.loadPriorities()
    this.loadDepartments()
    this.loadEmployees()

  }
}
