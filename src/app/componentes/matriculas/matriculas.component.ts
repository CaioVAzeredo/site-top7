import { Component } from '@angular/core';
import { ButtonComponentComponent } from "../button-component/button-component.component";
import { ModalComponentComponent } from "../modal-component/modal-component.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-matriculas',
  standalone: true,
  imports: [ButtonComponentComponent, ModalComponentComponent, CommonModule],
  templateUrl: './matriculas.component.html',
  styleUrl: './matriculas.component.css'
})
export class MatriculasComponent {
  modalAdesao = false;
  modalMensalidade = false;
  modalUniforme = false;

  alertAberto = false;
  alertTitulo = '';
  alertMensagem = '';





  abrirModalAdesao(event: Event) {
    
  }

  fecharModalAdesao() {
    
  }

  abrirModalMensalidade(event: Event) {
    
  }

  fecharModalMensalidade() {
    
  }

  abrirModalUniforme(event: Event) {
    
  }

  fecharModalUniforme() {
    
  }
}

