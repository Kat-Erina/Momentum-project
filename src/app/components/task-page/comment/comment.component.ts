import { Component, EventEmitter, inject, input, Input, Output, signal } from '@angular/core';
import { CommentService } from '../../../core/services/comments-service.service';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-comment',
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
@Input() id!:number;
commentService=inject(CommentService)
apiService=inject(ApiService)
value=signal('')
@Input() target=""
@Output() toggleCommentDiv = new EventEmitter<void>(); // Emits event to parent

// taskId=input.required<number>()

toggle() {
  this.toggleCommentDiv.emit(); // Trigger event when called
}

text="";

handlechange(event:Event){
const value=(event.target as HTMLTextAreaElement).value;
this.value.set(value);
console.log(value);
console.log(this.id)
}

handlecommentAdd(){
  if(this.target==="comment"){
    this.apiService.addComment(this.id,{'text':this.value()}).subscribe({
      next:(response)=>{console.log(response);
        if(response){
          this.apiService.getTaskComments(this.id).subscribe({
            next:response=>{console.log(response);
              this.commentService.comments.set(response)
              this.toggle()
            }
          })
        }
      }
    })
  }
 if(this.target==='reply'){
  this.apiService.addComment(Number(this.commentService.taskId()),{'text':this.value(), 'parent_id':this.id}).subscribe({
    next:(response)=>{console.log(response);
      if(response){
        this.apiService.getTaskComments(this.commentService.taskId()).subscribe({
          next:response=>{console.log(response);
            this.commentService.comments.set(response)
            
          }
        })
      }
    }
  })
 }
 
}
}
