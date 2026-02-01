import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ApiService } from '../../service/api.service';
import { Escola } from '../../models/escolas.model';

import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from '../../componentes/rodape/rodape.component';
import { BotaoSubirComponent } from '../../componentes/botao-subir/botao-subir.component';
import { ModalidadesComponent } from '../../componentes/modalidades-component/modalidades.component';

@Component({
  selector: 'app-pagina-escola',
  standalone: true,
  imports: [
    CommonModule,
    CabecalhoComponent,
    RodapeComponent,
    BotaoSubirComponent,
    ModalidadesComponent,
    RouterLink
  ],
  templateUrl: './pagina-escola.component.html',
  styleUrls: ['./pagina-escola.component.css'],
})
export class PaginaEscolaComponent implements OnInit {
  abaAtiva: 'unidade' | 'adesao' = 'unidade';

  escolaId = '';
  escola: Escola | null = null;

  // ✅ loading por componente
  carregandoEscola = true;

  // ✅ loading da logo (não mostra carregando)
  logoImgLoaded = false;
  logoImgError = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  setAba(aba: 'adesao' | 'unidade') {
    this.abaAtiva = aba;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.escolaId = params.get('escolaId') ?? '';
      this.carregarEscola();
      if (typeof window !== 'undefined') window.scrollTo(0, 0);
    });
  }

  private carregarEscola(): void {
    this.carregandoEscola = true;

    // reset estados da imagem
    this.logoImgLoaded = false;
    this.logoImgError = false;

    this.apiService.getEscolas().subscribe({
      next: escolas => {
        this.escola = escolas.find(e => e.id === this.escolaId) ?? null;

        // ao trocar escola, volta a mostrar skeleton da logo até carregar
        this.logoImgLoaded = false;
        this.logoImgError = false;

        this.carregandoEscola = false;
      },
      error: () => {
        this.escola = null;
        this.carregandoEscola = false;
      }
    });
  }

  // ✅ eventos da logo
  onLogoLoad() {
    this.logoImgLoaded = true;
    this.logoImgError = false;
  }

  onLogoError() {
    this.logoImgError = true;
    this.logoImgLoaded = false;
  }
}
