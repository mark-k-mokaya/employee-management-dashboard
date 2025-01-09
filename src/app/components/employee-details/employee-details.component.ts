import {
  Component,
  inject,
  input,
  viewChild,
  OnInit,
  afterNextRender,
} from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Chart from 'chart.js/auto';
import { FormsModule, NgForm } from '@angular/forms';
import { EmployeeType } from '../../models/employee.model';

@Component({
  selector: 'app-employee-details',
  imports: [RouterLink, FormsModule, FontAwesomeModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent implements OnInit {
  employeeId = input.required<string>();
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  employee?: EmployeeType;
  closeIcon = faClose;

  private form = viewChild.required<NgForm>('form');
  showModal = false;

  softSkillsChart: any = [];
  techSkillsChart: any = [];

  constructor() {
    afterNextRender(() => {});
  }

  ngOnInit() {
    this.softSkillsChart = generateChart('softSkillsChart', [
      'Leadership',
      'Disciple',
      'Innovative',
      'Collaboration',
    ]);
    this.techSkillsChart = generateChart('techSkillsChart', [
      'Work Quality',
      'Targets Achieved',
      'Work Efficiency',
      'Work Improvement',
    ]);

    this.employee = this.employeeService.employees.find(
      (user) => user.id == parseInt(this.employeeId())
    );
  }

  onSubmit() {
    if (this.form()?.valid) {
      this.employeeService.updateEmployee(
        this.employeeId(),
        this.form()?.value
      );
      this.employee = this.employeeService.employees.find(
        (user) => user.id == parseInt(this.employeeId())
      );
      this.showModal = false;
      return;
    }

    alert('Invalid form data');
  }

  onDelete() {
    const confirmation = window.confirm(
      'Are you sure that you want to delete ' + this.employee?.name + '?'
    );

    if (confirmation) {
      this.employeeService.deleteEmployee(this.employeeId());
      this.router.navigate(['/'], { replaceUrl: true });
    }
  }

  onToggleModal() {
    this.showModal = !this.showModal;
    if (this.showModal) {
      setTimeout(() => {
        this.form().controls['name'].setValue(this.employee?.name);
        this.form().controls['jobTitle'].setValue(this.employee?.jobTitle);
        this.form().controls['department'].setValue(this.employee?.department);
        this.form().controls['status'].setValue(this.employee?.status);
        this.form().controls['joiningDate'].setValue(
          this.employee?.joiningDate
        );
      }, 1);
    }
  }
}

function generateChart(canvasId: string, labels: string[]) {
  return new Chart(canvasId, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Performance Rating',
          data: new Array(4)
            .fill(0)
            .map((num) => (num = Math.random() * 10).toFixed(1)),
          backgroundColor: '#26252D',
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
