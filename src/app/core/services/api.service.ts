import { HttpClient,  HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Comment, Department, Employee, Priority, Status, Task } from "../models/models";

@Injectable({
    'providedIn':'root'
})
export class ApiService{
http=inject(HttpClient);
apiUrl="https://momentum.redberryinternship.ge/api";
private token="9e7c9ccc-25fe-4d4e-a0cb-2de10adeae78";

    getAllTasks(){
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
          });
return this.http.get<Task[]>(`${this.apiUrl}/tasks`, {headers})
    }

    getStatuses(){   
return this.http.get<Status[]>(`${this.apiUrl}/statuses`)
    }

    getPriorities(){   
        return this.http.get<Priority[]>(`${this.apiUrl}/priorities`)
     }

     getDepartments(){   
        return this.http.get<Department[]>(`${this.apiUrl}/departments`)
     }
     getEmployees(){   
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
          });
        return this.http.get<Employee[]>(`${this.apiUrl}/employees`, {headers})
     }

     handleTaskSubmission(data:any){
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
          });
        return this.http.post<any[]>(`${this.apiUrl}/tasks`, data,{headers})
     }

     addEmployee(data:any){
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
          });
        return this.http.post<Employee>(`${this.apiUrl}/employees`, data,{headers})
     }

     getTask(id:number){
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      });

      return this.http.get<Task>(`${this.apiUrl}/tasks/${id}`,{headers})
     }

     updateTaskStatus(id:number, data:{status_id:number|undefined}){
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      });

      return this.http.put<Task>(`${this.apiUrl}/tasks/${id}`,data,{headers})
     }

     getTaskComments(id:number){
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      });

      return this.http.get<Comment[]>(`${this.apiUrl}/tasks/${id}/comments`,{headers})
     }

     addComment(id:number, value:{'text':string} | {'text':string, 'parent_id':number}){
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      });
      return this.http.post<any>(`${this.apiUrl}/tasks/${id}/comments`,value, {headers})
     }

     

}

