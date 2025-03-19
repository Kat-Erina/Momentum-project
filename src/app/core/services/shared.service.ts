import { inject, Injectable, Signal, signal } from "@angular/core";
import { Department, Employee, Priority, Task } from "../models/models";
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

filtersDropdownOpen=signal(false)
allEmployees=signal<Employee[]>([])
priorities=signal<Priority[]>([])
data=signal<any[]>([]);


aboutToStartTsks=signal<Task[]>([]);
inProgressTsks=signal<Task[]>([]);
readyForTestingTasks=signal<Task[]>([]);
finishedTasks=signal<Task[]>([])



loadEmployees(){
    this.apiService.getEmployees().subscribe({
        next:(response)=>{
        let data=response.filter(empl=>{
            return empl.department.id===this.departmentId()
          });
    this.employees.set(data)
        }
      })
}

getDepartments(){
    this.apiService.getDepartments().subscribe({
        next:(response)=>{
          this.departments.set(response)
          this.data.set(response)
        }
      })
}

getAllEmployees(){
    this.apiService.getEmployees().subscribe({
        next:(response)=>{
          this.allEmployees.set(response)
          this.data.set(response)
          console.log(this.data())
        }
      })
}

getPriorities(){
    this.apiService.getPriorities().subscribe({
        next:(response)=>{
          this.priorities.set(response)
          this.data.set(response)
        }
      })
}

}