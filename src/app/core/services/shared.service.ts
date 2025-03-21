import { DestroyRef, inject, Injectable, Signal, signal } from "@angular/core";
import { Department, Employee, Priority, Task } from "../models/models";
import { ApiService } from "./api.service";

@Injectable({
    providedIn:'root'
})
export class SharedService{
  destroyRef=inject(DestroyRef)
employeeModalIsOpen=signal(false);
employees=signal<Employee[]>([]);
departmentId=signal<number|undefined>(0)
apiService=inject(ApiService)
departments=signal<Department[]>([])

filtersDropdownOpen=signal(false)
allEmployees=signal<Employee[]>([])
priorities=signal<Priority[]>([])
data=signal<any[]>([]);
allTasks=signal<Task[]>([])
storedTasks=signal<Task[]>([])


aboutToStartTsks=signal<Task[]>([]);
inProgressTsks=signal<Task[]>([]);
readyForTestingTasks=signal<Task[]>([]);
finishedTasks=signal<Task[]>([])



loadEmployees(){
  let sbsc=this.apiService.getEmployees().subscribe({
        next:(response)=>{
        let data=response.filter(empl=>{
            return empl.department.id===this.departmentId()
          });
    this.employees.set(data)
    console.log(this.employees())
        },
        error:(error)=>{
          console.log(error)
        }
      });

      this.destroyRef.onDestroy(()=>{
        sbsc.unsubscribe()
      })

}

getDepartments(){
   let subsc= this.apiService.getDepartments().subscribe({
        next:(response)=>{
          this.departments.set(response)
          this.data.set(response)
        },
        error:(error)=>{
          console.log(error)
        }
      });

      this.destroyRef.onDestroy(()=>{
        subsc.unsubscribe()
      })
}

getAllEmployees(){
  let subsc=this.apiService.getEmployees().subscribe({
        next:(response)=>{
          this.allEmployees.set(response)
          this.data.set(response)
        },
        error:(error)=>console.log(error)
      });

    this.destroyRef.onDestroy(()=>{
      subsc.unsubscribe()
    })
}

getPriorities(){
   let subsc=this.apiService.getPriorities().subscribe({
        next:(response)=>{
          this.priorities.set(response)
          this.data.set(response)
        },
        error:(error)=>{
          console.log(error)
        }
      });
      this.destroyRef.onDestroy(()=>{
        subsc.unsubscribe()
      })
}

}