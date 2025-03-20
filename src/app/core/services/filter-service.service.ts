import { computed, inject, Injectable, OnInit, signal, WritableSignal } from "@angular/core";
import { Department, Employee, FilteresObj, Priority, Task } from "../models/models";
import { SharedService } from "./shared.service";
import { ApiService } from "./api.service";

@Injectable({
    'providedIn':'root'
})
export class FilterService {
sharedService=inject(SharedService)
departmentsFiltersCriterias=signal<Department[]>([]);
apiService=inject(ApiService)

prioritiesFiltersCriterias=signal<Priority[]>([]);
employeesFiltersCriterias=signal<Employee[]>([]);

departmentIsOpen=signal(false)
priorityIsOpen=signal(false)
employyesAreOpen=signal(false)
array=signal<(Priority | Department |Employee |undefined)[]>([])

addUniqueItems(newItems: (Priority | Department |Employee)[]) {
    this.array.update(currentArray => {
      const uniqueItems = newItems.filter(newItem => 
        !currentArray.some(existingItem => 
          existingItem?.id === newItem.id && existingItem.name === newItem.name
        )
      );
      return [...currentArray, ...uniqueItems];
    });
  }
  
fileteringCriterias=signal<FilteresObj>({
    priorities:[], 
    departments:[], 
    employees:[]
})



filter(array:WritableSignal<Task[]>, obj:WritableSignal<FilteresObj>){
let updatedInfo=array().filter(task=>
 (obj().departments.length === 0 || obj().departments.some(dep => dep.id === task.department.id)) &&
  (obj().employees.length === 0 || obj().employees.some(emp => emp.id === task.employee.id)) &&
  (obj().priorities.length === 0 || obj().priorities.some(pri => pri.id === task.priority.id))
      )
      array.set(updatedInfo)
localStorage.setItem('filters', JSON.stringify(this.fileteringCriterias()))

}



}