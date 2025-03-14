import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Department, Employee, Priority, Status } from "../models/models";

@Injectable({
    'providedIn':'root'
})
export class ApiService{
http=inject(HttpClient);
apiUrl="https://momentum.redberryinternship.ge/api";
private token="9e6a4b18-f1c6-49f5-b69c-916ce3da4ac1"
    getAllTasks(){
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
          });
return this.http.get(`${this.apiUrl}/tasks`, {headers})
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
}

