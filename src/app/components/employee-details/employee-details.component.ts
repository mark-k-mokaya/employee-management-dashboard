import {
  Component,
  inject,
  input,
  computed,
  ElementRef,
  viewChild,
  OnInit,
} from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { RouterLink } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-employee-details',
  imports: [RouterLink],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent implements OnInit {
  employeeId = input.required<string>();
  private employeeService = inject(EmployeeService);
  employee = computed(() =>
    this.employeeService.getEmployeeById(this.employeeId())
  );

  softSkillsChart: any = [];
  techSkillsChart: any = [];

  constructor() {}

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
          data: new Array(4).fill(0).map((num) =>
            (num = Math.random() * 10).toFixed(1)
          ),
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
