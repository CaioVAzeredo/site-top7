import { Component, Input } from '@angular/core';
import { CabecalhoComponent } from "../../componentes/cabecalho/cabecalho.component";
import { BotaoSubirComponent } from "../../componentes/botao-subir/botao-subir.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modalidade',
  imports: [CabecalhoComponent, BotaoSubirComponent, RouterLink, CommonModule],
  templateUrl: './modalidade.component.html',
  styleUrl: './modalidade.component.css'
})
export class ModalidadeComponent {
  

}
