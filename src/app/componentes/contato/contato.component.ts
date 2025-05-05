import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponentComponent } from '../button-component/button-component.component';

@Component({
  selector: 'app-contato',
  imports: [CommonModule, ButtonComponentComponent],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {
  form(event: Event) {
    event.preventDefault();
    alert('Formulario enviado');
  }
}