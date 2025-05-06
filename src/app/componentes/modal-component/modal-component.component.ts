import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})
export class ModalComponentComponent {
  @Output() fechar = new EventEmitter<void>();

  onFechar() {
    this.fechar.emit();
    
  }
}
