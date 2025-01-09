import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  output,
  ViewChild,
} from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faClose } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { EmployeeType } from '../../models/employee.model';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [FontAwesomeModule, RouterLink, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private employeeService = inject(EmployeeService);
  employees = this.employeeService.employees;
  icon = faSearch;
  closeIcon = faClose;
  searchString = '';
  dashboardView: 'card' | 'table' = 'card';
  showModal = false;

  @ViewChild('form') form?: NgForm;

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
      if (target.innerText == '▾') {
        return a[criteria] > b[criteria] ? 1 : -1;
      } else {
        return a[criteria] > b[criteria] ? -1 : 1;
      }
    });

    target.innerText = target.innerText == '▴' ? '▾' : '▴';
  }

  onSubmit() {
    if (this.form?.valid) {
      this.employeeService.createEmployee(this.form?.value);
      this.employees = this.employeeService.employees;
      this.showModal = false;
      return;
    }

    alert('Invalid form data')
  }

  onToggleModal() {
    this.showModal = !this.showModal;
  }
}
