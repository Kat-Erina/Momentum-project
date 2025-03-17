import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../core/services/shared.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  service=inject(SharedService)
  employeeModalIsOpen=this.service.employeeModalIsOpen
  opendialog(){
this.employeeModalIsOpen.set(true)
  }
}
