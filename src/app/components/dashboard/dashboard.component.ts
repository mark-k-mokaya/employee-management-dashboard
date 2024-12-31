import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { EmployeeType } from '../../models/employee.model';

@Component({
  selector: 'app-dashboard',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private employeeService = inject(EmployeeService);
  employees = this.employeeService.employees;
  icon = faSearch;
  searchString = '';

  onSearchInputChange(input: string) {
    this.searchString = input.toLowerCase();
    this.employees = this.employeeService.employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(this.searchString) ||
        employee.jobTitle.toLowerCase().includes(this.searchString) ||
        employee.department.toLowerCase().includes(this.searchString)
    );
  }

  onSortBy(criteria: keyof EmployeeType, target: HTMLSpanElement) {
    this.employees = this.employees.sort((a, b) => {
      if (target.innerText == '▴') {
        return a[criteria] > b[criteria] ? 1 : -1;
      } else {
        return a[criteria] > b[criteria] ? -1 : 1;
      }
    });

    target.innerText = target.innerText == '▴' ? '▾' : '▴';
  }
}
