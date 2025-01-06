import { Injectable } from '@angular/core';
import users from '../../assets/mock-employees.json';
import { EmployeeType } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor() {}

  get employees() {
    return users as EmployeeType[];
  }

  getEmployeeById(id: string) {
    return users.find((employee) => employee.id === parseInt(id));
  }
}
