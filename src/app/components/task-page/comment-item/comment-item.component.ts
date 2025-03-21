import { Component, inject, Input, signal } from '@angular/core';
import { Comment } from '../../../core/models/models';
import { CommentComponent } from "../comment/comment.component";
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-comment-item',
  imports: [CommentComponent],
  templateUrl: './comment-item.component.html',
  styleUrl: './comment-item.component.scss'
})
export class CommentItemComponent {
@Input() commentItem!:Comment;
showCommentdiv=signal(false);
apiService=inject(ApiService);



toggleComment() {
  this.showCommentdiv.set(!this.showCommentdiv()); // Toggle value
  console.log(this.showCommentdiv)
}
}
