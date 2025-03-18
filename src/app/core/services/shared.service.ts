import { inject, Injectable, Signal, signal } from "@angular/core";
import { Department, Employee } from "../models/models";
import { ApiService } from "./api.service";

@Injectable({
    providedIn:'root'
})
export class SharedService{
employeeModalIsOpen=signal(false);
employees=signal<Employee[]>([]);
departmentId=signal<number|undefined>(0)
apiService=inject(ApiService)
departments=signal<Department[]>([])

loadEmployees(){
    this.apiService.getEmployees().subscribe({
        next:(response)=>{
        let data=response.filter(empl=>{
            return empl.department.id===this.departmentId()
          });
    this.employees.set(data)
    console.log(data)
        }
      })
}

loadDepartments(){}

}