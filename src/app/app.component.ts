import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { SharedService } from './core/services/shared.service';
import { EmployeeModalComponent } from './components/employee-modal/employee-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, EmployeeModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Momentum-project';
  service=inject(SharedService);
  employeeModalIsOpen=this.service.employeeModalIsOpen;
}
