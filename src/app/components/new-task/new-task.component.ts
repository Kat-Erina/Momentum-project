import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Department, Employee, Priority, Status } from '../../core/models/models';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { InputComponent } from "../../core/components/input/input.component";
import { DropdownComponent } from "../../core/components/dropdown/dropdown.component";
import { SharedService } from '../../core/services/shared.service';

@Component({
  selector: 'app-new-task',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, FormsModule, DropdownComponent],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent implements OnInit {
  router=inject(Router)
  apiService=inject(ApiService);
  service=inject(SharedService);
  destroyRef=inject(DestroyRef)
  title:string="";
  description:string="";
  descriptionFocused=signal<boolean>(false);
  departmentId=this.service.departmentId;

  initialDate=this.getTomorrowDate();
  selectedDate=this.initialDate;


  handleTitleValueChange(value: string) {
    this.updateFieldData('title', value,)
  }

  get isTitleLengthValid(): boolean {
    return this.title.length >= 3;
  }

  get isTitleMaximumLengthValid(): boolean {
    return this.title.length<=255;
  }

  doesNotHaveEnoughWords=signal(true);
  checkWordCount(value:string) {
    if(value.length>0){ 
         const words = value?.trim().split(/\s+/) || [];
      this.doesNotHaveEnoughWords.set(words.length < 4)
      console.log(this.doesNotHaveEnoughWords())
    } else{
      this.doesNotHaveEnoughWords.set(false);
      console.log(this.doesNotHaveEnoughWords())
    }

  }

  handleTextAreaValueChange(value:string){
    this.descriptionFocused.set(true)
this.description=value
this.checkWordCount(value)
this.updateFieldData('description', value,)
  }


  data!:Data
  value=signal('');
  formSubmited=signal(false)

  priorities=signal<Priority[]>([])
  dropdownOpen = signal(false);
  selectedOption=signal<Priority | null>(null);

  statuses=signal<Status[]>([])
  dropdownOpenStatus = signal(false);
  selectedStatusOption=signal<Status|null>(null);

  departments=signal<Department[]>([])
  dropdownOpenDepartment = signal(false);
  selectedDepartmentOption=signal<Department|null>(null);

  employees=this.service.employees
  dropdownOpenEmployees = signal(false);
  selectedEmployee=signal<Employee|null>(null);

  loadPriorities(){
   let subs= this.apiService.getPriorities().subscribe({
      next:(response)=>{
          this.priorities.set(response);
          if(this.data?.['priority']){
            this.selectedOption.set(this.data?.['priority']);
          } else{
            this.selectedOption.set(response[1]);
            // this.updateFieldData('priority', this.selectedOption())
          }
        
      },
      error:(error)=>{console.log(error)}
    })

    this.destroyRef.onDestroy(()=>{
      subs.unsubscribe()
    })
  }


  testValue=signal<any>({})

  handleChange(event:any){
  
    const {option, chosenField}=event

    if(chosenField==="priorities"){
      this.selectedOption.set(option);
    this.dropdownOpen.set(false);
    this.updateFieldData('priority', this.selectedOption())
    }
    if(chosenField==="statuses"){
      this.selectedStatusOption.set(option);
      this.updateFieldData('status', this.selectedStatusOption())
    this.dropdownOpenStatus.set(false);
  }
  if(chosenField==="departments"){
    this.selectedDepartmentOption.set(option);
    this.departmentId.set(this.selectedDepartmentOption()?.id)
  this.dropdownOpenDepartment.set(false);
  this.updateFieldData('department', this.selectedDepartmentOption())
this.service.loadEmployees()
this.selectedEmployee.set(null);
  }
  if(chosenField==="employees"){
    this.selectedEmployee.set(option);
    this.updateFieldData('employee', this.selectedEmployee())
  this.dropdownOpenEmployees.set(false);
  }
  }


  loadStatuses(){
  let subsc=  this.apiService.getStatuses().subscribe({
      next:(response)=>{
        this.statuses.set(response)
        if(this.data?.['status']){
          this.selectedStatusOption.set(this.data?.['status']);
        } else{
          this.selectedStatusOption.set(response[0]);
        }

      },
      error:(error)=>{console.log(error)}
    });

    this.destroyRef.onDestroy(()=>{
      subsc.unsubscribe()
    })
  }

  loadDepartments(){
  let subsc=  this.apiService.getDepartments().subscribe({
      next:response=>{
        this.departments.set(response)
        if(this.data?.['department']){
          this.selectedDepartmentOption.set(this.data?.['department']);
        } 
      },
      error:(error)=>{console.log(error)}
    });

    this.destroyRef.onDestroy(()=>{
      subsc.unsubscribe()
    })
  }
 
  getTomorrowDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); 
    return tomorrow.toISOString().split('T')[0]; 
  }

  compareDates(){
  return  new Date(this.initialDate)>new Date(this.selectedDate)
  }
  
  ngOnInit(): void {
    // localStorage.removeItem('taskData')
let fetchedData=localStorage.getItem('taskData');
if(fetchedData){
  this.data=JSON.parse(fetchedData);
  if(this.data['title']){
    this.title=this.data['title']
  }
  if(this.data['description']){
    this.description=this.data['description'];
    console.log(this.description)
console.log(this.doesNotHaveEnoughWords())
this.checkWordCount(this.description)
console.log(this.doesNotHaveEnoughWords())
  }
  
   this.selectedDepartmentOption.set(this.data?.['department'])
   console.log(this.selectedDepartmentOption())
   this.selectedStatusOption.set(this.data?.['status'])
   this.selectedOption.set(this.data?.['priority'])
this.selectedEmployee.set(this.data?.['employee'])}
this.loadPriorities();
this.loadStatuses()
this.loadDepartments();
this.service.loadEmployees()


if(this.selectedDepartmentOption()){
 this.service.loadEmployees()
  }}
 
  //date

  


  toggleDropdownFn(option:string) {
    if(option==="priorities"){
      this.dropdownOpen.set(!this.dropdownOpen()) ;
    }
  if(option==="statuses"){
      this.dropdownOpenStatus.set(!this.dropdownOpenStatus()) ;
    }
    if(option==="departments"){
      this.dropdownOpenEmployees.set(false) 
    }
    if(option==="employees"){
      this.dropdownOpenEmployees.set(!this.dropdownOpenEmployees()) ;
    
    }
  }

updateFieldData(field:string, value:Priority|Status|Department|Employee|string|null){
  if(field==='department'){
    this.data = {
      ...this.data,  
      [field]: value,
      'employee':""
    };}
  this.data = {
    ...this.data,  
    [field]: value
  };
  localStorage.setItem('taskData', JSON.stringify(this.data));
}

// isPastDate(selectedDate: string): boolean {
//   const today = new Date(); // Get today's date
//   const selected = this.parseDate(selectedDate); 

//   return selected < today;
// }

  handleSubmit() {
    
 this.formSubmited.set(true);
    console.log(this.compareDates())
if(this.selectedOption() && this.selectedStatusOption() && this.selectedDepartmentOption() && this.selectedEmployee() && this.title?.length>3 && this.title?.length<256 && this.description?.length<256 && !this.doesNotHaveEnoughWords()
&& !this.compareDates()) 
                {
                  let data={
       
  name:this.title,
  description:this.description,
  due_date: this.selectedDate,
  status_id: this.selectedStatusOption()?.id,
  employee_id: this.selectedEmployee()?.id,
  priority_id: this.selectedOption()?.id
                  }
                  console.log(data)
// let subsc=this.apiService.handleTaskSubmission(data).subscribe({
//   next:(response)=>{
//     if(response)
//     localStorage.removeItem('taskData');
//     this.router.navigate(['']);
//   },
//   error:(error)=>{console.log(error)}
  
// });
// this.destroyRef.onDestroy(()=>{
//   subsc.unsubscribe()
// })


} 
else {console.log('araa swori')}
    

}
}
