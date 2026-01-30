import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ApiService } from '../../service/api.service';
import { Escola } from '../../models/escolas.model';

import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from '../../componentes/rodape/rodape.component';
import { BotaoSubirComponent } from '../../componentes/botao-subir/botao-subir.component';
import { ModalidadesComponent } from '../../componentes/modalidades-component/modalidades.component';
import { MatriculasComponent } from "../../componentes/matriculas/matriculas.component";

@Component({
  selector: 'app-pagina-escola',
  standalone: true,
  imports: [CommonModule, CabecalhoComponent, RodapeComponent, BotaoSubirComponent, ModalidadesComponent, RouterLink],
  templateUrl: './pagina-escola.component.html',
  styleUrl: './pagina-escola.component.css'
})
export class PaginaEscolaComponent implements OnInit {
  abaAtiva: 'unidade' | 'adesao' = 'unidade';

  setAba(aba: 'adesao' | 'unidade') {
    this.abaAtiva = aba;
  }
  escolaId = '';
  escola: Escola | null = null;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.escolaId = params.get('escolaId') ?? '';
      this.carregarEscola();
      if (typeof window !== 'undefined') window.scrollTo(0, 0);
    });
  }

  private carregarEscola(): void {
    this.apiService.getEscolas().subscribe(escolas => {
      this.escola = escolas.find(e => e.id === this.escolaId) ?? null;
    });
  }
}
