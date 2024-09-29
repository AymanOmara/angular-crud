import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../core/shared-module';

@Component({
  imports: [ReactiveFormsModule, SharedModule],
  standalone: true,
  selector: 'app-add-employee',
  templateUrl: './add-employee-component.html',
  styleUrl: './add-employee-component.css',
})
export class AddEmployeeComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required], // Name control
      email: ['', [Validators.required, Validators.email]], // Email control
      age: ['', [Validators.required, Validators.min(1)]], // Age control
      password: ['', [Validators.required, Validators.minLength(6)]], // Password control
    });
  }
  onSubmit(): void {}
}
