import { Component, Input } from '@angular/core';
import { Task } from '../../../core/models/models';
import { CommonModule, DatePipe } from '@angular/common';
import { ShortenTextPipe } from '../../../pipes/shorten-text.pipe';
import { ModifyLengthPipe } from '../../../pipes/modify-length.pipe';

@Component({
  selector: 'app-task-card',
  standalone:true,
  imports: [DatePipe, ShortenTextPipe, CommonModule, ModifyLengthPipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
@Input() task!:Task;
@Input() color!:string;

getDepartmentClass(departmentName: string): string {
  const departmentColors: { [key: string]: string } = {
  'ადმინისტრაციის დეპარტამენტი': 'bgc-pink',
      'ფინანსების დეპარტამენტი': 'bgc-blue',
      'გაყიდვები და მარკეტინგის დეპარტამენტი': 'bgc-pink',
      "ადამიანური რესურსების დეპარტამენტი":'bgc-pink',
      "ლოჯოსტიკის დეპარტამენტი":"bgc-blue",
      "ტექნოლოგიების დეპარტამენტი":"bgc-yellow",
"მედიის დეპარტამენტი":'bgc-orange',
  };

  return departmentColors[departmentName];
}

getPriorityClass(priorityName: string): string {
  const prioritycolors: { [key: string]: string } = {
  'დაბალი': 'green-font',
      'მაღალი': 'red-font',
      'საშუალო': 'yellow-font',
  };

  return prioritycolors[priorityName];
}
}
