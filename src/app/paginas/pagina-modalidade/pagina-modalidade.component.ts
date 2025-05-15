import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Unidade } from '../../componentes/unidade/unidade';
import { CabecalhoComponent } from "../../componentes/cabecalho/cabecalho.component";
import { RodapeComponent } from "../../componentes/rodape/rodape.component";
import { WppComponent } from "../../componentes/wpp/wpp.component";
import { BotaoSubirComponent } from "../../componentes/botao-subir/botao-subir.component";
import { Horario } from './horario';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pagina-modalidade',
  templateUrl: './pagina-modalidade.component.html',
  styleUrls: ['./pagina-modalidade.component.css'],
  imports: [CabecalhoComponent,
    RodapeComponent,
    WppComponent,
    BotaoSubirComponent,
    CommonModule
  ]
})
export class PaginaModalidadeComponent implements OnInit {
  id: number = 0;
  imagem: string = '';
  titulo: string = '';
  numero: string = '';
  grade: { nivel: string; horarios: Horario[] }[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.carregarModalidade();
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }

    });
  }

  carregarModalidade(): void {
    this.apiService.getDadosModalidade().subscribe((modalidades: Unidade[]) => {
      const modalidade = modalidades.find((unidade: Unidade) => unidade.id === this.id);

      if (modalidade) {
        this.imagem = modalidade.imagem;
        this.titulo = modalidade.titulo;
        this.numero = modalidade.numero;

        this.grade = modalidade.grade;

      }
    });
  }
}
