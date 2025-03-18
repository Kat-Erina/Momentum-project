import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status',
  imports: [],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
@Input() status=""
@Input() color=" "
}
