import { Injectable, signal } from "@angular/core";
import { Data, Department, Employee, Priority, Status } from "../models/models";

@Injectable({
    providedIn:'root'
})
export class SharedService{
data!:Data

departments=signal<Department[]>([])
dropdownOpenDepartmentInTask = signal(false);
selectedDepartmentOptionInTask=signal<Department|null>(null);



// updateFieldData(field:string, value:Priority|Status|Department|Employee|string|null, data:Data){
//   console.log(data)
//   if(field==='department'){
//     data = {
//       ...data,  
//       [field]: value,
//       'employee':""
//     };}
//   else{
//     data = {
//       ...data,  
//       [field]: value
//     };
//   }
//   localStorage.setItem('taskData', JSON.stringify(data));
}


  //   selectDepartment(option:any){
   
  //       this.selectedDepartmentOptionInTask.set(option);
  //     this.dropdownOpenDepartmentInTask.set(false);
  //     this.updateFieldData('department', this.selectedDepartmentOption(), this.data)
  //     this.apiService.getEmployees().subscribe({
  //       next:(response)=>{
  //       let data=response.filter(empl=>{
  //           return empl.department.id===this.selectedDepartmentOption()?.id
  //         });
  // this.employees.set(data)
  //       }
  //     })
  // this.selectedEmployee.set(null);
  //   }
