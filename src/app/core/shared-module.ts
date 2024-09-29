import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from './compnents/loading-component';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesService } from '../employee/common/employees-service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterOutlet,
    HttpClientModule,
  ],
  providers: [EmployeesService, MessageService],
  exports: [LoadingComponent, CommonModule, ToastModule],
  declarations: [LoadingComponent],
})
export class SharedModule {}
