import { Component, DestroyRef, EventEmitter, inject, input, Input, Output, signal } from '@angular/core';
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
@Output() toggleCommentDiv = new EventEmitter<void>();
destroyRef=inject(DestroyRef)


toggle() {
  this.toggleCommentDiv.emit(); 
}

text="";

handlechange(event:Event){
const value=(event.target as HTMLTextAreaElement).value;
this.value.set(value);

}

handlecommentAdd(){
  if(this.target==="comment"){
    if(/^(?!\s*$).+/.test(this.value()) ){
      
    let subsc=this.apiService.addComment(this.id,{'text':this.value()}).subscribe({
      next:(response)=>{
        if(response){
         let subsc= this.apiService.getTaskComments(this.id).subscribe({
            next:response=>{
              this.commentService.comments.set(response)
              this.toggle();
              this.commentService.commentsLength.set(this.commentService.commentsLength()+1)
              this.value.set("")
            },
            error:(error)=>{console.log(error)}
          });
          this.destroyRef.onDestroy(()=>{
            subsc.unsubscribe()
          })
        }
      },
      error:(error)=>{console.log(error)}
    });

    this.destroyRef.onDestroy(()=>{subsc.unsubscribe()})
    } else{
      alert('ცარიელი კომენტარის დაწერა შეუძლებელია')
    }
   
  }
 if(this.target==='reply'){
    if(/^(?!\s*$).+/.test(this.value()) ){
    let subsc=this.apiService.addComment(Number(this.commentService.taskId()),{'text':this.value(), 'parent_id':this.id}).subscribe({
        next:(response)=>{
          if(response){
           let subsc=this.apiService.getTaskComments(this.commentService.taskId()).subscribe({
              next:response=>{
                this.commentService.comments.set(response)
                this.toggle();
                this.commentService.commentsLength.set(this.commentService.commentsLength()+1);
                this.value.set("")
              },
              error:(error)=>{console.log(error)}
            });

            this.destroyRef.onDestroy(()=>{
              subsc.unsubscribe()
            })
          }
        },
        error:(error)=>{
          console.log(error)
        }
      });
      this.destroyRef.onDestroy(()=>{
        subsc.unsubscribe()
      })
    } 
    else{
      alert('ცარიელი კომენტარის დაწერა შეუძლებელია')
    }
 }
 
}
}
