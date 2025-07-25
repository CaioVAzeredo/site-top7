import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  imports: [],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent {

  constructor(private router: Router) { }
  menuAberto = false;
  statusMenu() {
    this.menuAberto = !this.menuAberto;
  }
  pagHome() {
    this.router.navigate(['/']);
  }
  cart() {
    alert("Carrinho de compras clicado!");
  }
}
