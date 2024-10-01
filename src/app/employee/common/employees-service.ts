import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../core/base-response';
import { Employee } from './employee-model';
import { AddEmployeeModel } from '../add-employee.ts/add-employee-model';
@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private baseUrl: string = 'http://localhost:5128/api/employees/';
  constructor(private http: HttpClient) {}
  getEmployees(): Observable<BaseResponse<Employee[]>> {
    return this.http.get<BaseResponse<Employee[]>>(this.baseUrl + 'employees');
  }
  deleteEmployee(employeeId: number): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(
      `${this.baseUrl}delete-employee/${employeeId}`
    );
  }
  addEmployee(employee: AddEmployeeModel): Observable<BaseResponse<Employee>> {
    console.log(employee.name);
    console.log(employee.age);
    console.log(employee.phoneNumber);
    return this.http.post<BaseResponse<Employee>>(
      this.baseUrl + 'add-employee',
      employee
    );
  }
}
