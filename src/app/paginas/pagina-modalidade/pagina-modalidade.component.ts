import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ApiService } from '../../service/api.service';
import { NivelGrade } from '../../models/escolas.model';

import { CabecalhoComponent } from "../../componentes/cabecalho/cabecalho.component";
import { RodapeComponent } from "../../componentes/rodape/rodape.component";
import { WppComponent } from "../../componentes/wpp/wpp.component";
import { BotaoSubirComponent } from "../../componentes/botao-subir/botao-subir.component";

@Component({
  selector: 'app-pagina-modalidade',
  standalone: true,
  imports: [CommonModule, RouterLink, CabecalhoComponent, RodapeComponent, WppComponent, BotaoSubirComponent],
  templateUrl: './pagina-modalidade.component.html',
  styleUrls: ['./pagina-modalidade.component.css'],
})
export class PaginaModalidadeComponent implements OnInit {
  escolaId = '';
  unidadeId = '';

  imagem: string = '';
  titulo: string = '';
  numero: string = '';
  grade: NivelGrade[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }
  abaAtiva: 'grade' | 'uniformes' = 'grade';

  setAba(aba: 'grade' | 'uniformes') {
    this.abaAtiva = aba;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.escolaId = params.get('escolaId') ?? '';
      this.unidadeId = params.get('unidadeId') ?? '';

      this.apiService.getUnidade(this.escolaId, this.unidadeId).subscribe(unidade => {
        if (!unidade) return;

        this.imagem = unidade.imagem;
        this.titulo = unidade.titulo;
        this.numero = unidade.numero;
        this.grade = unidade.grade;
      });

      if (typeof window !== 'undefined') window.scrollTo(0, 0);
    });
  }
}
