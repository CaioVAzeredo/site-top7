import { Component, HostListener } from '@angular/core';
import { CabecalhoComponent } from "../../componentes/cabecalho/cabecalho.component";
import { HeroComponent } from "../../componentes/hero/hero.component";
import { SobreNosComponent } from "../../componentes/sobre-nos/sobre-nos.component";
import { ModalidadesComponent } from "../../componentes/modalidades/modalidades.component";
import { MatriculasComponent } from "../../componentes/matriculas/matriculas.component";
import { EquipeComponent } from "../../componentes/equipe/equipe.component";
import { ContatoComponent } from "../../componentes/contato/contato.component";
import { RodapeComponent } from "../../componentes/rodape/rodape.component";
import { WppComponent } from "../../componentes/wpp/wpp.component";
import { BotaoSubirComponent } from "../../componentes/botao-subir/botao-subir.component";

@Component({
  selector: 'app-principal',
  imports: [CabecalhoComponent, HeroComponent, SobreNosComponent, ModalidadesComponent, MatriculasComponent, EquipeComponent, ContatoComponent, RodapeComponent, WppComponent, BotaoSubirComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {
  @HostListener('window:scroll',[])
onWindowScroll(){
  const elementos = document.querySelectorAll('.scroll-animar');
  const alturaDaJanela = window.innerHeight;

  elementos.forEach((elemento: any)=>{
    const posicaoTopo = elemento.getBoundingClientRect().top;

    if(posicaoTopo < alturaDaJanela-100){
      elemento.classList.add('aparecer');
    }
  });
}
}
