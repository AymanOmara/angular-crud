import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../core/shared-module';
import { EmployeesService } from '../common/employees-service';
import { AddEmployeeModel } from './add-employee-model';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  imports: [ReactiveFormsModule, SharedModule],
  standalone: true,
  selector: 'app-add-employee',
  templateUrl: './add-employee-component.html',
  styleUrl: './add-employee-component.css',
})
export class AddEmployeeComponent implements OnInit {
  loading = false;
  userForm: FormGroup;
  employeeModel: AddEmployeeModel = new AddEmployeeModel();

  constructor(
    private service: EmployeesService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      age: [0, Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.userForm.valueChanges.subscribe((formValues) => {
      this.updateEmployeeModel(formValues);
    });
  }
  onSubmit(): void {
    this.loading = true;
    this.service.addEmployee(this.employeeModel).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'employee added successfully',
        });

        console.log('Employee added successfully', data);
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error',
        });
        console.error('Error occurred while adding employee', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  updateEmployeeModel(formValues: any) {
    this.employeeModel.name = formValues.name;
    this.employeeModel.phoneNumber = formValues.phoneNumber;
    this.employeeModel.age = formValues.age;

    console.log('Updated Employee Model:', this.employeeModel);
  }
}
