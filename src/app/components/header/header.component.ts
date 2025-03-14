import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
dialog=inject(MatDialog);

opendialog(){
  this.dialog.open(EmployeeModalComponent, {
   width:'913px',
   height:'500px'
  })
}
}
