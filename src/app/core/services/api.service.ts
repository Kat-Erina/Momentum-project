import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

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
return this.http.get(`${this.apiUrl}/statuses`)
    }

    getPriorities(){   
        return this.http.get(`${this.apiUrl}/priorities`)
     }

     getDepartments(){   
        return this.http.get(`${this.apiUrl}/departments`)
     }
     getEmployees(){   
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
          });
        return this.http.get(`${this.apiUrl}/employees`, {headers})
     }
}