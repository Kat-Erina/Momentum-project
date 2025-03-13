import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Department, Employee, Priority, Status } from '../../core/models/models';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { CalendarComponent } from './calendar/calendar.component';
import { debounce } from './helper';

@Component({
  selector: 'app-new-task',
  imports: [CommonModule,ReactiveFormsModule ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent implements OnInit {
  apiService=inject(ApiService)
  value=signal('');
  formSubmited=signal(false)

  priorities=signal<Priority[]>([])
  dropdownOpen = signal(false);
  selectedOption=signal<Priority | null>(null);
  selectedOptionValid=signal(false)

  statuses=signal<Status[]>([])
  dropdownOpenStatus = signal(false);
  selectedStatusOption=signal<Status|null>(null);
  selectedStatusValid=signal(false)

  departments=signal<Department[]>([])
  dropdownOpenDepartment = signal(false);
  selectedDepartmentOption=signal<Department|null>(null);
  selectedDepartmentValid=signal(false)

  employees=signal<Employee[]>([])
  dropdownOpenEmployees = signal(false);
  selectedEmployee=signal<Employee|null>(null);
  selectedEmployeeValid=signal(false)


  form:FormGroup=new FormGroup({
    title:new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
    description:new FormControl('', [Validators.required])
  })

  get titleValidation(){
    return this.form.get('title');
  }

  get description(){
    return this.form.get('description');
  }

get validation(){
 return this.selectedOption() && this.selectedStatusOption() && this.selectedDepartmentOption() && this.selectedEmployee()
}
  loadPriorities(){
    this.apiService.getPriorities().subscribe({
      next:(response)=>{
          this.priorities.set(response)
        
      }
    })
  }

  loadStatuses(){
    this.apiService.getStatuses().subscribe({
      next:(response)=>{
        this.statuses.set(response)
      }
    })
  }

  loadDepartments(){
    this.apiService.getDepartments().subscribe({
      next:response=>{
        this.departments.set(response)
      }
    })
  }
  loadEmployees(){
    this.apiService.getEmployees().subscribe(
      {
        next:response=>{         
          if(this.selectedDepartmentOption())
          this.employees.set(response)
        }
      }
    )
  }
  ngOnInit(): void {
    this.loadPriorities()
    this.loadStatuses()
    this.loadDepartments()
    console.log(this.formSubmited())
  }
 

  toggleDropdown(option:string) {
    if(option==="priorities"){
      this.dropdownOpen.set(!this.dropdownOpen()) ;
    }
  if(option==="statuses"){
      this.dropdownOpenStatus.set(!this.dropdownOpenStatus()) ;
    }
    if(option==="departments"){
      this.dropdownOpenDepartment.set(!this.dropdownOpenDepartment()) ;
    
    }
    if(option==="employees"){
      this.dropdownOpenEmployees.set(!this.dropdownOpenEmployees()) ;
    
    }
  }

  selectOption(option: any, chosenField:string) {
    if(chosenField==="priorities"){
      this.selectedOption.set(option);
    this.dropdownOpen.set(false);
    this.selectedOptionValid.set(true)
    }
    if(chosenField==="statuses"){
      this.selectedStatusOption.set(option);
    this.dropdownOpenStatus.set(false);
    this.selectedStatusValid.set(true)
    }
    if(chosenField==="departments"){
      this.selectedDepartmentOption.set(option);
    this.dropdownOpenDepartment.set(false);
    this.loadEmployees();
    this.selectedDepartmentValid.set(true)
    }
    if(chosenField==="employees"){
      this.selectedEmployee.set(option);
    this.dropdownOpenEmployees.set(false);
    this.selectedEmployeeValid.set(true)
    }
   
  }

  handleSubmit() {
    this.formSubmited.set(true);
      console.log(this.formSubmited())
    if(!this.selectedOption()){
this.selectedOptionValid.set(false)
    }
    if(!this.selectedStatusOption()){
      this.selectedStatusValid.set(false)
          }
    if(!this.selectedDepartmentOption()){
      this.selectedDepartmentValid.set(false)
          }
          if(!this.selectedEmployee()){
            this.selectedEmployeeValid.set(false)
                }
              
                if (this.form.valid && this.validation) {
                  console.log('Submitting data:', this.form.value);
                  let data={
                    name: this.form.get('title')?.value,
  description: this.form.get('description')?.value,
  due_date: "2025-12-31",
  status_id: this.selectedStatusOption()?.id,
  employee_id: this.selectedEmployee()?.id,
  priority_id: this.selectedOption()?.id
                  }
                  console.log(data)
this.apiService.handleTaskSubmission(data).subscribe({
  next:(response)=>{
    console.log(response)
  }
})
                } 
                
    
  }

  debouncedSearch = debounce((value: string) => {
    console.log('Searching for:', value);
  }, 1000);

  onValueChange(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.value.set(input);
    this.debouncedSearch(input); 
  }
}
