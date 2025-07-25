import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-overlay" *ngIf="show">
      <img src="/assets/logoazul.png" alt="Logo" class="loading-image" />
    </div>
  `,
  styleUrls: ['./loading.component.css']

})
export class LoadingComponent {
  @Input() show = false;
}
