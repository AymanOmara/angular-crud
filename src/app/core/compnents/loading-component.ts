import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading',
  styleUrls: ['./loading-component.css'], // Changed styleUrl to styleUrls
  templateUrl: './loading-component.html',
})
export class LoadingComponent {
  @Input() loading = false;
}
