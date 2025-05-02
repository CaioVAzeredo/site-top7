import { Component } from '@angular/core';

@Component({
  selector: 'app-cabecalho',
  imports: [],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent {
  menuAberto = false;
  statusMenu() {
    this.menuAberto = !this.menuAberto;
  }
  cart() {
    alert("Carrinho de compras clicado!");
  }
}
