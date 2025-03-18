import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Task } from '../../core/models/models';
import { StatusComponent } from "../../core/components/status/status.component";
import { TaskCardComponent } from './task-card/task-card.component';

@Component({
  selector: 'app-tasks',
  imports: [StatusComponent, TaskCardComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit{
apiService=inject(ApiService);
tasks=signal<Task[]>([])

loadallTasks(){
  this.apiService.getAllTasks().subscribe({
    next:(response)=>{
      this.tasks.set(response)
    }
  })
}

  ngOnInit(): void {
    this.loadallTasks();

  }
}
