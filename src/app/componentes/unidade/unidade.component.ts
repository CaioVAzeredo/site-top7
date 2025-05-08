import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unidade',
  imports: [CommonModule, RouterLink],
  templateUrl: './unidade.component.html',
  styleUrl: './unidade.component.css'
})
export class UnidadeComponent {
  @Input() imagem: string = '';
  @Input() titulo: string = '';
  @Input() id: number = 0;

}
