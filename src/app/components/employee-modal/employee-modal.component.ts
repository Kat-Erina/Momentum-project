import { Component, inject, OnInit, signal } from '@angular/core';
import { InputComponent } from "../../core/components/input/input.component";
import { ApiService } from '../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Department, Employee } from '../../core/models/models';
import { DropdownComponent } from "../../core/components/dropdown/dropdown.component";
import { SharedService } from '../../core/services/shared.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-modal',
  imports: [InputComponent, DropdownComponent, CommonModule],
  templateUrl: './employee-modal.component.html',
  styleUrl: './employee-modal.component.scss'
})
export class EmployeeModalComponent implements OnInit {
formSubmited=signal(false)
name="";
surname=""
imageSrc = signal<string |ArrayBuffer| null>('');
apiService=inject(ApiService)
service=inject(SharedService)
http=inject(HttpClient)
departments=signal<Department[]>([]);
selectedDepartment=signal<any>(null);
dropdownOpen=signal(false)
data?:any
photo=signal<any>({})



  get isNameMinimumLengthValid(): boolean {
    return /^(?!\s)(?=(?:.*[a-zA-Zა-ჰ]){2,})[a-zA-Zა-ჰ\s]+$/.test(this.name);
  }
  get isSurnameMinimumLengthValid(): boolean {
    return /^(?!\s)(?=(?:.*[a-zA-Zა-ჰ]){2,})[a-zA-Zა-ჰ\s]+$/.test(this.surname);
  }

  get isNameMaximumLengthValid(): boolean {
    const lettersOnly = this.name.replace(/[^a-zA-Zა-ჰ]/g, '');
  return lettersOnly.length <= 255
  }
  get isSurnameMaximumLengthValid(): boolean {
    const lettersOnly = this.name.replace(/[^a-zA-Zა-ჰ]/g, '');
    return lettersOnly.length <= 255
  }

ngOnInit(): void {
  this.apiService.getDepartments().subscribe({
    next:(response)=>{
      this.departments.set(response)
    }
  })
}

  onFileChange(event: Event) {


    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0 && input.files[0]) {
      const file = input.files[0];
     
      const maxSize = 600 * 1024;
      if (file.size > maxSize) {
        alert('File size exceeds the 600KB limit.');
        return;
      }
     
      const formData = new FormData();
      formData.append('file', file, file.name);
      this.photo.set(input.files[0]);

      const reader=new FileReader()
      reader.onload = () => {
        const imageString=reader.result as string;
        this.imageSrc.set(imageString)
        }
        reader.readAsDataURL(input.files[0]);

    
    } 
     
  }

   triggerFileInput() {
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      fileInput?.click();
    }

    removeImg(event:Event){
event.stopPropagation()
      this.imageSrc.set("")
      }

      handleChange(event:any){
        this.selectedDepartment.set(event.option)
        this.dropdownOpen.set(false)
      }

      cancel(event:Event)
      {event.stopPropagation()
        this.service.employeeModalIsOpen.set(false)
      }
     validateForm(){
      if(this.isNameMaximumLengthValid&& this.isNameMinimumLengthValid && this.isSurnameMaximumLengthValid && this.isSurnameMinimumLengthValid&& this.selectedDepartment()&& this.imageSrc() )
        return true
      else { return false}
     } 

      handleSubmit(){
        this.formSubmited.set(true)
        if(this.validateForm())
{    
  const formData = new FormData();
  formData.append('avatar', this.photo(), this.photo().name);
  formData.append('name', this.name);
  formData.append('surname', this.surname);
  formData.append('department_id', this.selectedDepartment().id);
this.apiService.addEmployee(formData).subscribe(
  {
    next:(response)=>{
      if(response){
        this.service.employeeModalIsOpen.set(false);
        this.service.loadEmployees()
      }
    }

  }
)
}    
 } 
  
    }
