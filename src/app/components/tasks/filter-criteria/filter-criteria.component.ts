import { Component, inject } from '@angular/core';
import { FilterService } from '../../../core/services/filter-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-criteria',
  imports: [CommonModule],
  templateUrl: './filter-criteria.component.html',
  styleUrl: './filter-criteria.component.scss'
})
export class FilterCriteriaComponent {
filtersService=inject(FilterService)
}
