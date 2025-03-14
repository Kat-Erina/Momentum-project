import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Department, Employee, Priority, Status } from '../../core/models/models';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import { SharedService } from '../../core/services/sharedFunctions.service';

@Component({
  selector: 'app-new-task',
  imports: [CommonModule,ReactiveFormsModule ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent implements OnInit {
  apiService=inject(ApiService);
  sharedService=inject(SharedService);

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

  employees=signal<Employee[]>([])
  dropdownOpenEmployees = signal(false);
  selectedEmployee=signal<Employee|null>(null);


  form:FormGroup=new FormGroup({
    title:new FormControl(this.data?.['title'] || '', [Validators.required]),
    description:new FormControl('')
  })

  get titleValidation(){
    return this.form.get('title');
  }

  get description(){
    return this.form.get('description');
  }

  doesNotHaveEnoughWords=true;
  checkWordCount(value:string) {
    const words = value?.trim().split(/\s+/) || [];
    this.doesNotHaveEnoughWords = words.length < 4;
  }

  titleIsNotValid=true
  checkTitleValidation(value: string) {
    this.titleIsNotValid = value?.length < 2 || value?.length >255}

 
  

get validation(){
 return this.selectedOption() && this.selectedStatusOption() && this.selectedDepartmentOption() && this.selectedEmployee()
}



  loadPriorities(){
    this.apiService.getPriorities().subscribe({
      next:(response)=>{
          this.priorities.set(response);
          if(this.data?.['priority']){
            this.selectedOption.set(this.data?.['priority']);
          } else{
            this.selectedOption.set(response[1]);
          }
        
      }
    })
  }

  loadStatuses(){
    this.apiService.getStatuses().subscribe({
      next:(response)=>{
        this.statuses.set(response)
        if(this.data?.['status']){
          this.selectedStatusOption.set(this.data?.['status']);
        } else{
          this.selectedStatusOption.set(response[0]);
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
let fetchedData=localStorage.getItem('taskData');
if(fetchedData){
  this.data=JSON.parse(fetchedData);
  this.form.patchValue({ 
    title: this.data ? this.data['title'] : '', 
    description: this.data ? this.data['description'] : '' 
  });
  
this.selectedEmployee.set(this.data?.['employee'])}
  this.loadPriorities();
  this.loadStatuses()
  this.loadDepartments();
 
      this.form.get('description')?.valueChanges.subscribe(value => {
      this.checkWordCount(value);
      this.updateFieldData('description', value,)
    });
    this.form.get('title')?.valueChanges.subscribe((value:string) => {
      console.log(value)
      this.checkTitleValidation(value);
      this.updateFieldData('title', value)
    });
  
  }
 
  
  toggleDropdown(option:string) {
    if(option==="priorities"){
      this.dropdownOpen.set(!this.dropdownOpen()) ;
    }
  if(option==="statuses"){
      this.dropdownOpenStatus.set(!this.dropdownOpenStatus()) ;
    }
    if(option==="departments"){
      this.dropdownOpenDepartment.set(!this.dropdownOpenDepartment());
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

  selectOption(option: any, chosenField:string) {
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
    this.dropdownOpenDepartment.set(false);
    this.updateFieldData('department', this.selectedDepartmentOption())
    this.apiService.getEmployees().subscribe({
      next:(response)=>{
      let data=response.filter(empl=>{
          return empl.department.id===this.selectedDepartmentOption()?.id
        });
this.employees.set(data)
      }
    })
this.selectedEmployee.set(null);
    }
    if(chosenField==="employees"){
      this.selectedEmployee.set(option);
      this.updateFieldData('employee', this.selectedEmployee())
    this.dropdownOpenEmployees.set(false);
    }
   
  }

  handleSubmit() {
    this.formSubmited.set(true);
                if (this.form.valid && this.validation) {
                  let data={
                    name: this.form.get('title')?.value,
  description: this.form.get('description')?.value,
  due_date: "2025-12-31",
  status_id: this.selectedStatusOption()?.id,
  employee_id: this.selectedEmployee()?.id,
  priority_id: this.selectedOption()?.id
                  }
this.apiService.handleTaskSubmission(data).subscribe({
  next:(response)=>{
    if(response)
    localStorage.removeItem('taskData');
  }
})} 
    }

}
