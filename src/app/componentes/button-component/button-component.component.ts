import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-component.component.html',
  styleUrl: './button-component.component.css'
})
export class ButtonComponentComponent {
  @Input() texto: string = 'Clique aqui';
  @Input() type: string = 'button';

  @Output() clickBotao = new EventEmitter<Event>();

  emitirClick(){
    this.clickBotao.emit(event);
  }
  
}
