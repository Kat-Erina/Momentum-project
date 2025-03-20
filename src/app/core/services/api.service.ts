import { HttpClient,  HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Department, Employee, Priority, Status, Task } from "../models/models";

@Injectable({
    'providedIn':'root'
})
export class ApiService{
http=inject(HttpClient);
apiUrl="https://momentum.redberryinternship.ge/api";
private token="9e77d81b-97b7-44c5-af98-524985d04c02"
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

}

