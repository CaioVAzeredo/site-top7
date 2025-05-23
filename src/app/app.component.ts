import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabecalhoComponent } from "./componentes/cabecalho/cabecalho.component";
import { HeroComponent } from "./componentes/hero/hero.component";
import { ModalidadesComponent } from "./componentes/modalidades-component/modalidades.component";
import { SobreNosComponent } from "./componentes/sobre-nos/sobre-nos.component";
import { MatriculasComponent } from "./componentes/matriculas/matriculas.component";
import { EquipeComponent } from "./componentes/equipe/equipe.component";
import { ContatoComponent } from "./componentes/contato/contato.component";
import { RodapeComponent } from "./componentes/rodape/rodape.component";
import { WppComponent } from "./componentes/wpp/wpp.component";
import { BotaoSubirComponent } from "./componentes/botao-subir/botao-subir.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent {

  title = 'top7';
}

