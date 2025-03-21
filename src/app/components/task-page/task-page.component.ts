import { Component, DestroyRef, inject, input, OnInit, signal, } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import {  Comment, Status, Task } from '../../core/models/models';
import { DropdownComponent } from "../../core/components/dropdown/dropdown.component";
import { CommonModule } from '@angular/common';
import { ShortenTextPipe } from '../../pipes/shorten-text.pipe';
import { StylingService } from '../../core/services/styling.service';
import { DateTransformerPipe } from '../../pipes/date-transformer.pipe';
import { CommentComponent } from "./comment/comment.component";
import { CommentItemComponent } from "./comment-item/comment-item.component";
import { CommentService } from '../../core/services/comments-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-page',
  imports: [CommonModule, ShortenTextPipe, DateTransformerPipe, CommentComponent, CommentItemComponent, FormsModule],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent implements OnInit {
apiService=inject(ApiService)
stylingService=inject(StylingService)
commentsService=inject(CommentService)
destroyRef=inject(DestroyRef)
taskId=input.required<number>()
task!:Task;


chosenStatus=signal<Status|null>(null)
options=signal<Status[]>([])
optionsAreOpen=signal(false)
commentItem: any;


toggleOptions(){
  this.optionsAreOpen.set(!this.optionsAreOpen())
}
changeStatus(option:Status){
this.chosenStatus.set(option);
this.optionsAreOpen.set(false);
this.sendstatusUpdateRequest()

}

sendstatusUpdateRequest(){
let subsc=this.apiService.updateTaskStatus(Number(this.taskId()), {'status_id':this.chosenStatus()?.id}).subscribe({
  error:(error)=>console.log(error)
})
this.destroyRef.onDestroy(()=>{
  subsc.unsubscribe()
})

}

getTaskInfo(){
 let subsc=this.apiService.getTask(Number(this.taskId())).subscribe({
    next:(response)=>{
      this.task=response;
      this.chosenStatus.set(this.task.status)
    },
error:(error)=>{
  console.log(error)
}
  });

  this.destroyRef.onDestroy(()=>{
    subsc.unsubscribe()
  })
}

getTaskComments(){
 let subsc=this.apiService.getTaskComments(Number(this.taskId())).subscribe({
    next:(response)=>{
      const commentsLength = response.reduce((sum, comment) => {
        return sum + 1 + (comment.sub_comments?.length || 0); 
      }, 0);
     this.commentsService.commentsLength.set(commentsLength);
      this.commentsService.comments.set(response)
    },
    error:(error)=>{
      console.log(error)
    }
  })

  this.destroyRef.onDestroy(()=>{
    subsc.unsubscribe()
  })
}

getAllStatus(){
 let subsc= this.apiService.getStatuses().subscribe({
    next:(response)=>{
      this.options.set(response)
    },
    error:(error)=>{
      console.log(error)
    }
  });

  this.destroyRef.onDestroy(()=>{
    subsc.unsubscribe()
  })
}

ngOnInit(): void {
  this.getTaskInfo()
  this.getTaskComments();
  this.getAllStatus();
  this.commentsService.taskId.set(this.taskId())
}
}
