import { Component, Input } from '@angular/core';
import { CabecalhoComponent } from "../../componentes/cabecalho/cabecalho.component";
import { BotaoSubirComponent } from "../../componentes/botao-subir/botao-subir.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RodapeComponent } from "../../componentes/rodape/rodape.component";
import { WppComponent } from "../../componentes/wpp/wpp.component";

@Component({
  selector: 'app-modalidade',
  imports: [CabecalhoComponent, BotaoSubirComponent, RouterLink, CommonModule, RodapeComponent, WppComponent],
  templateUrl: './modalidade.component.html',
  styleUrl: './modalidade.component.css'
})
export class ModalidadeComponent {
  

}
