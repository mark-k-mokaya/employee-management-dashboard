import { Injectable } from '@angular/core';
import users from '../../assets/mock-employees.json';
import { EmployeeType } from '../models/employee.model';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees: EmployeeType[] = users as EmployeeType[];

  constructor() {}

  getEmployeeById(id: string) {
    return this.employees.find((user) => user.id === parseInt(id));
  }

  createEmployee(data: Omit<EmployeeType, 'id'>) {
    this.employees = [...this.employees, { ...data, id: users.length + 1 }];
    console.log(this.employees);
  }

  updateEmployee(id: string, data: Omit<EmployeeType, 'id'>) {
    this.employees = this.employees.map((user) => {
      if (user.id == parseInt(id)) {
        return (user = { ...user, ...data });
      }
      return user;
    });
  }

  deleteEmployee(id: string) {
    this.employees = this.employees.filter((user) => user.id !== parseInt(id));
  }
}
