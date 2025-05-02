import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabecalhoComponent } from "./componentes/cabecalho/cabecalho.component";
import { HeroComponent } from "./componentes/hero/hero.component";
import { ModalidadesComponent } from "./componentes/modalidades/modalidades.component";

@Component({
  selector: 'app-root',
  imports: [CabecalhoComponent, HeroComponent, ModalidadesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // <-- aqui estava errado
})
export class AppComponent {
  title = 'top7';
}

