import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponentComponent } from "../button-component/button-component.component";

@Component({
  selector: 'app-modal-component',
  standalone: true,
  imports: [CommonModule, ButtonComponentComponent],
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})
export class ModalComponentComponent {


  @Input() titulo: string = '';
  @Input() conteudo: string = '';
  @Output() fechar = new EventEmitter<void>();

  fecharModal() {
    this.fechar.emit();
  }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden'; // impede scroll da página
  }

  ngOnDestroy(): void {
    document.body.style.overflow = ''; // libera scroll ao fechar
  }
}
