import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from './compnents/loading-component';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesService } from '../employee/common/employees-service';
@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterOutlet,
    HttpClientModule,
  ],
  providers: [EmployeesService],
  exports: [LoadingComponent],
  declarations: [LoadingComponent],
})
export class SharedModule {}
