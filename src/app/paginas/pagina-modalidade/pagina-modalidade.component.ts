import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Unidade } from '../../componentes/unidade/unidade';
import { CabecalhoComponent } from "../../componentes/cabecalho/cabecalho.component";
import { RodapeComponent } from "../../componentes/rodape/rodape.component";
import { WppComponent } from "../../componentes/wpp/wpp.component";
import { BotaoSubirComponent } from "../../componentes/botao-subir/botao-subir.component";

@Component({
  selector: 'app-pagina-modalidade',
  templateUrl: './pagina-modalidade.component.html',
  styleUrls: ['./pagina-modalidade.component.css'],
  imports: [CabecalhoComponent, RodapeComponent, WppComponent, BotaoSubirComponent]
})
export class PaginaModalidadeComponent implements OnInit {
  id: number = 0;
  imagem: string = '';
  titulo: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];  
      this.carregarModalidade();
    });
  }

  carregarModalidade(): void {
    this.apiService.getDadosModalidade().subscribe((modalidades: Unidade[]) => {
      const modalidade = modalidades.find((unidade: Unidade) => unidade.id === this.id);
      
      if (modalidade) {
        this.imagem = modalidade.imagem;
        this.titulo = modalidade.titulo;
      }
    });
  }
}
