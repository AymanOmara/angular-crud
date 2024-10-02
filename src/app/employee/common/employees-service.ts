import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BaseResponse } from '../../core/base-response';
import { Employee } from './employee-model';
import { AddEmployeeModel } from '../add-employee.ts/add-employee-model';
@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private baseUrl: string = 'http://localhost:5128/api/employees/';
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$ = this.employeesSubject.asObservable();
  constructor(private http: HttpClient) {}
  getEmployees(): Observable<BaseResponse<Employee[]>> {
    return this.http
      .get<BaseResponse<Employee[]>>(this.baseUrl + 'employees')
      .pipe(
        tap((response) => {
          this.employeesSubject.next(response.data ?? []);
        })
      );
  }
  deleteEmployee(employeeId: number): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(
      `${this.baseUrl}delete-employee/${employeeId}`
    );
  }
  addEmployee(employee: AddEmployeeModel): Observable<BaseResponse<Employee>> {
    return this.http
      .post<BaseResponse<Employee>>(this.baseUrl + 'add-employee', employee)
      .pipe(
        tap((response) => {
          if (response.data != null && response.statusCode == 200) {
            const updatedList = [...this.employeesSubject.value, response.data];
            this.employeesSubject.next(updatedList);
          }
        })
      );
  }
  updateEployee(employee: Employee): Observable<BaseResponse<Employee>> {
    return this.http
      .put<BaseResponse<Employee>>(`${this.baseUrl}update-employee`, employee)
      .pipe(
        tap((response) => {
          if (response.data != null) {
            let indexToUpdate = this.employeesSubject.value.findIndex(
              (item) => item.id === employee.id
            );
            this.employeesSubject.value[indexToUpdate] = response.data!;
          }
        })
      );
  }
}
