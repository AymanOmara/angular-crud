import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../common/employees-service';
import { Employee } from '../../common/employee-model';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { LoadingComponent } from '../../../core/compnents/loading-component';
import { SharedModule } from '../../../core/shared-module';

@Component({
  imports: [RouterOutlet, MatTableModule, SharedModule],
  standalone: true,
  selector: 'app-employees-component',
  templateUrl: './employees-component.html',
  styleUrl: './employees-component.css',
})
export class EmployeesComponent implements OnInit {
  constructor(private service: EmployeesService, private router: Router) {}
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
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Navigation ended: ', event);
      }
    });
  }
  delete(employee: Employee) {
    this.loading = true;
  }
}
/*
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesComponent } from './employee/employees/employees-component/employees-component';
import { EmployeesService } from './employee/common/employees-service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './core/compnents/loading-component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddEmployeeComponent } from './employee/add-employee.ts/add-employee-component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmployeesComponent, LoadingComponent, AddEmployeeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [EmployeesService, provideAnimationsAsync('animations')],
  bootstrap: [],
})
export class AppModule {}

*/
