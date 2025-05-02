import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabecalhoComponent } from "./componentes/cabecalho/cabecalho.component";
import { HeroComponent } from "./componentes/hero/hero.component";
import { ModalidadesComponent } from "./componentes/modalidades/modalidades.component";
import { SobreNosComponent } from "./componentes/sobre-nos/sobre-nos.component";
import { MatriculasComponent } from "./componentes/matriculas/matriculas.component";
import { EquipeComponent } from "./componentes/equipe/equipe.component";
import { ContatoComponent } from "./componentes/contato/contato.component";
import { RodapeComponent } from "./componentes/rodape/rodape.component";

@Component({
  selector: 'app-root',
  imports: [CabecalhoComponent, HeroComponent, ModalidadesComponent, SobreNosComponent, MatriculasComponent, EquipeComponent, ContatoComponent, RodapeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // <-- aqui estava errado
})
export class AppComponent {
  title = 'top7';
}

