import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../../../core/models/models';
import { CommonModule, DatePipe } from '@angular/common';
import { ShortenTextPipe } from '../../../pipes/shorten-text.pipe';
import { ModifyLengthPipe } from '../../../pipes/modify-length.pipe';
import { StylingService } from '../../../core/services/styling.service';

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
@Output() idEmitter=new EventEmitter<number>()

stylingService=inject(StylingService)

idEmitterFn(){
  this.idEmitter.emit(this.task.id)
}



}
