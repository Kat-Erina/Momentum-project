import { Component, Input } from '@angular/core';
import { Task } from '../../../core/models/models';
import { DatePipe } from '@angular/common';
import { ShortenTextPipe } from '../../../pipes/pipes/shorten-text.pipe';

@Component({
  selector: 'app-task-card',
  standalone:true,
  imports: [DatePipe, ShortenTextPipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
@Input() task!:Task
}
