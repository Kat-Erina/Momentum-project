import { Injectable, signal } from "@angular/core";
import { Comment } from "../models/models";

@Injectable({
    'providedIn':'root'
})
export class CommentService{
comments=signal<Comment[]>([]);
taskId=signal<number>(0);
showCommentdiv=signal(false);

addcomment(id:number, text:string){
console.log(id, text)
}
}