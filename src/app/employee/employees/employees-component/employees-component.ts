import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../common/employees-service';
import { Employee } from '../../common/employee-model';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../../core/shared-module';
import { MessageService } from 'primeng/api';

@Component({
  imports: [RouterOutlet, MatTableModule, SharedModule],
  standalone: true,
  selector: 'app-employees-component',
  templateUrl: './employees-component.html',
  styleUrl: './employees-component.css',
})
export class EmployeesComponent implements OnInit {
  constructor(
    private service: EmployeesService,
    private router: Router,
    private messageService: MessageService
  ) {}
  loading = true;
  employees: Employee[] = [];
  displayedColumns: string[] = ['id', 'name', 'phoneNumber', 'age', 'actions'];

  ngOnInit(): void {
    this.loading = true;
    this.service.getEmployees().subscribe((data) => {
      this.loading = false;
      this.employees = data?.data ?? [];
    });
  }
  edit(employee: Employee) {
    // this.loading = true;
    this.router.navigate(['/add']);
  }
  deleteEmployee(employee: Employee) {
    this.loading = true;
    this.service.deleteEmployee(employee.id).subscribe({
      next: (data) => {
        this.loading = false;
        if (data.success) {
          this.employees = this.employees.filter(
            (emp) => employee.id !== emp.id
          );
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'employee added successfully',
          });
          console.log('Employee added successfully', data);
        }
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error try agian later',
        });
        console.error('Error occurred while adding employee', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
