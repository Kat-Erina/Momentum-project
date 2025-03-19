import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
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
  title:string="";
  description:string=" ";
  descriptionFocused=signal<boolean>(false);
  departmentId=this.service.departmentId

  handleTitleValueChange(value: string) {
    console.log(value)
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
    const words = value?.trim().split(/\s+/) || [];
    this.doesNotHaveEnoughWords.set(words.length < 4)
  }

  handleTextAreaValueChange(value:string){
    console.log(value)
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
    this.apiService.getPriorities().subscribe({
      next:(response)=>{
          this.priorities.set(response);
          if(this.data?.['priority']){
            this.selectedOption.set(this.data?.['priority']);
          } else{
            this.selectedOption.set(response[1]);
            // this.updateFieldData('priority', this.selectedOption())
          }
        
      }
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
    this.apiService.getStatuses().subscribe({
      next:(response)=>{
        this.statuses.set(response)
        if(this.data?.['status']){
          this.selectedStatusOption.set(this.data?.['status']);
        } else{
          this.selectedStatusOption.set(response[0]);
          // this.updateFieldData('status', this.selectedStatusOption())
        }

      }
    })
  }

  loadDepartments(){
    this.apiService.getDepartments().subscribe({
      next:response=>{
        this.departments.set(response)
        if(this.data?.['department']){
          this.selectedDepartmentOption.set(this.data?.['department']);
        } 
      }
    })
  }
 
  
  ngOnInit(): void {
// localStorage.clear()
console.log('title',this.title)

let fetchedData=localStorage.getItem('taskData');
if(fetchedData){
  this.data=JSON.parse(fetchedData);
   this.title=this.data ? this.data['title'] : '';
   this.description=this.data ? this.data['description'] : '';
   this.selectedDepartmentOption.set(this.data?.['department'])
   this.selectedStatusOption.set(this.data?.['status'])
   this.selectedOption.set(this.data?.['priority'])
this.selectedEmployee.set(this.data?.['employee'])}
this.loadPriorities();
this.loadStatuses()
this.loadDepartments();

if(this.selectedDepartmentOption()){
 this.service.loadEmployees()
  }}
 
  
  toggleDropdownFn(option:string) {
    console.log(option)
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



  handleSubmit() {
    this.formSubmited.set(true);
if(this.selectedOption() && this.selectedStatusOption() && this.selectedDepartmentOption() && this.selectedEmployee() && this.title?.length>3 && this.title?.length<256 && this.description?.length<256 && !this.doesNotHaveEnoughWords())
                {
                  let data={
       
  name:this.title,
  description:this.description,
  due_date: "2025-12-31",
  status_id: this.selectedStatusOption()?.id,
  employee_id: this.selectedEmployee()?.id,
  priority_id: this.selectedOption()?.id
                  }
                  console.log(data)
this.apiService.handleTaskSubmission(data).subscribe({
  next:(response)=>{
    if(response)
    localStorage.removeItem('taskData');
    this.router.navigate(['']);
  }
})} 
    

}
}
