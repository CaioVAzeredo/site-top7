import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabecalhoComponent } from "./componentes/cabecalho/cabecalho.component";

@Component({
  selector: 'app-root',
  imports: [CabecalhoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // <-- aqui estava errado
})
export class AppComponent {
  title = 'site-top7';
}

