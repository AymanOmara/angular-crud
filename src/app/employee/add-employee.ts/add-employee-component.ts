import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { SharedModule } from '../../core/shared-module';
import { EmployeesService } from '../common/employees-service';
import { AddEmployeeModel } from './add-employee-model';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../common/employee-model';
import { map } from 'rxjs';

@Component({
  imports: [ReactiveFormsModule, SharedModule, FormsModule],
  standalone: true,
  selector: 'app-add-employee',
  templateUrl: './add-employee-component.html',
  styleUrls: ['./add-employee-component.css'],
})
export class AddEmployeeComponent implements OnInit {
  loading = false;
  userForm: FormGroup;
  employeeModel: AddEmployeeModel = new AddEmployeeModel();
  employee: Employee | undefined;
  constructor(
    private service: EmployeesService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      age: [null, [Validators.required]], // Make sure to use 'null' for initial value
      phoneNumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Access the employee data from the router state
    this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((res) => {
        this.employee = res.employee; // Get the employee object
        console.log('Employee data:', this.employee); // Log the employee data for debugging

        if (this.employee) {
          // Populate the form with the employee data
          this.userForm.patchValue({
            name: this.employee.name,
            age: this.employee.age,
            phoneNumber: this.employee.phoneNumber,
          });

          // Update the employee model
          this.updateEmployeeModel(this.employee);
        }
      });

    // Listen for form changes
    this.userForm.valueChanges.subscribe((formValues) => {
      this.updateEmployeeModel(formValues);
    });
  }

  onSubmit(): void {
    if (!this.employee) {
      this.onAdd();
    } else {
      this.onUpdate();
    }
  }

  onAdd(): void {
    this.service.addEmployee(this.employeeModel).subscribe({
      next: (data) => {
        this.loading = false;
        if (data.statusCode === 200) {
          this.userForm.reset();
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee added successfully',
        });

        console.log('Employee added successfully', data);
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error, try again later',
        });
        console.error('Error occurred while adding employee', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  onUpdate(): void {
    this.loading = true;
    this.service.updateEployee(this.employee!).subscribe({
      error: (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error, try again later',
        });
      },
      next: (data) => {
        this.loading = false;
        if (data.statusCode === 200) {
          this.userForm.reset();
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Employee Updated successfully',
        });
      },
    });
  }

  updateEmployeeModel(formValues: any) {
    if (this.employee) {
      this.employee.name = formValues.name;
      this.employee.phoneNumber = formValues.phoneNumber;
      this.employee.age = formValues.age;
    } else {
      this.employeeModel.name = formValues.name;
      this.employeeModel.phoneNumber = formValues.phoneNumber;
      this.employeeModel.age = formValues.age;
    }
  }
}
