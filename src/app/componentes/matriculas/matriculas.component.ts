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


  abrirModalAdesao(event: Event) {
    alert('Em manutenção');
  }

  fecharModalAdesao() {
    alert('Em manutenção');
  }

  abrirModalMensalidade(event: Event) {
    alert('Em manutenção');
  }
  fecharModalMensalidade() {
    alert('Em manutenção');
  }

  abrirModalUniforme(event: Event) {
    alert('Em manutenção');
  }

  fecharModalUniforme() {
    alert('Em manutenção');
  }

}
