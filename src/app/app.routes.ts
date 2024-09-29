import { Routes } from '@angular/router';
import { EmployeesComponent } from './employee/employees/employees-component/employees-component';
import { AddEmployeeComponent } from './employee/add-employee.ts/add-employee-component';

export const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
  },
  {
    path: 'add',
    component: AddEmployeeComponent,
  },
];
