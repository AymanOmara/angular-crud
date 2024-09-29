import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../core/base-response';
import { Employee } from './employee-model';
@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private baseUrl: string = 'http://localhost:5128/api/employees/';
  constructor(private http: HttpClient) {}
  getEmployees(): Observable<BaseResponse<Employee[]>> {
    return this.http.get<BaseResponse<Employee[]>>(this.baseUrl + 'employees');
  }
  deleteEmployee(employee: Employee): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(
      this.baseUrl + 'delete-employee',
      {
        body: employee,
      }
    );
  }
}
