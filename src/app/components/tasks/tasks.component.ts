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

  ngOnInit(): void {
    this.loadallTasks();

  }
}
