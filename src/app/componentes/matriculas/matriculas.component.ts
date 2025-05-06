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

  abrirModalAdesao() {
    this.modalAdesao = true;
    document.body.classList.add('modal-aberto');
  }

  fecharModalAdesao() {
    this.modalAdesao = false;
    document.body.classList.remove('modal-aberto');
  }

  abrirModalMensalidade(){
    this.modalAdesao = true;
    document.body.classList.add('modal-aberto');
  }
  fecharModalMensalidade(){
    this.modalAdesao = false;
    document.body.classList.remove('modal-aberto');
  }

  abrirModalUniforme() {
    this.modalAdesao = true;
    document.body.classList.add('modal-aberto');
  }

  fecharModalUniforme() {
    this.modalAdesao = false;
    document.body.classList.remove('modal-aberto');
  }

}
