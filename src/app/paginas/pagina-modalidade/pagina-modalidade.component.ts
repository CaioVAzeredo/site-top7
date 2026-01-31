import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ApiService } from '../../service/api.service';
import { NivelGrade } from '../../models/escolas.model';

import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from '../../componentes/rodape/rodape.component';
import { WppComponent } from '../../componentes/wpp/wpp.component';
import { BotaoSubirComponent } from '../../componentes/botao-subir/botao-subir.component';
import { MatriculasComponent } from '../../componentes/matriculas/matriculas.component';

type Uniforme = {
  descricao: string;
  ['foto-frente']?: string;
  ['foto-costa']?: string;
};

@Component({
  selector: 'app-pagina-modalidade',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CabecalhoComponent,
    RodapeComponent,
    BotaoSubirComponent,
    MatriculasComponent,
  ],
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

  uniformes: Uniforme[] = [];

  precoUniforme = 130;
  precoAvulso = 70;

  abaAtiva: 'grade' | 'uniformes' | 'adesao' = 'grade';

  // ✅ controla qual foto está aparecendo em cada card
  private fotoIndex: Record<number, number> = {};
  private erroTentativas: Record<number, number> = {};

  // ✅ MODAL
  modalAberto = false;
  modalFotos: string[] = [];
  modalIndex = 0;
  modalDescricao = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }
  getTextoUniformes(): string {
    return this.escolaId === 'ideal'
      ? 'Compras apenas na secretaria'
      : 'Compras apenas na recepção';
  }

  setAba(aba: 'grade' | 'uniformes' | 'adesao') {
    this.abaAtiva = aba;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.escolaId = params.get('escolaId') ?? '';
      this.unidadeId = params.get('unidadeId') ?? '';

      this.apiService.getUnidade(this.escolaId, this.unidadeId).subscribe((unidade) => {
        if (!unidade) return;

        this.imagem = unidade.imagem;
        this.titulo = unidade.titulo;
        this.numero = unidade.numero;
        this.grade = unidade.grade;

        this.uniformes = (unidade as any).uniformes ?? [];

        // reset
        this.fotoIndex = {};
        this.erroTentativas = {};

        // fecha modal se trocar unidade
        this.closeUniformeModal();
      });

      if (typeof window !== 'undefined') window.scrollTo(0, 0);
    });
  }

  // fotos disponíveis (frente/costa)
  getFotos(u: Uniforme): string[] {
    return [u['foto-frente'], u['foto-costa']].filter(Boolean) as string[];
  }

  getFotoAtual(u: Uniforme, i: number): string | null {
    const fotos = this.getFotos(u);
    if (fotos.length === 0) return null;
    const idx = this.fotoIndex[i] ?? 0;
    return fotos[idx % fotos.length];
  }

  changeFoto(i: number, total: number, delta: number) {
    if (total <= 1) return;
    const current = this.fotoIndex[i] ?? 0;
    this.fotoIndex[i] = (current + delta + total) % total;
  }

  // se uma foto quebrar, tenta automaticamente a outra (1 vez)
  onUniformeImgError(i: number, total: number) {
    const tries = this.erroTentativas[i] ?? 0;

    if (total > 1 && tries < total - 1) {
      this.erroTentativas[i] = tries + 1;
      this.changeFoto(i, total, 1);
      return;
    }

    this.erroTentativas[i] = 0;
  }

  onUniformeImgLoad(i: number) {
    this.erroTentativas[i] = 0;
  }

  // ✅ ABRIR MODAL (clicou na imagem)
  openUniformeModal(u: Uniforme, cardIndex: number) {
    const fotos = this.getFotos(u);
    if (fotos.length === 0) return;

    this.modalFotos = fotos;
    const current = this.fotoIndex[cardIndex] ?? 0;
    this.modalIndex = Math.min(Math.max(current, 0), fotos.length - 1);
    this.modalDescricao = u.descricao;

    this.modalAberto = true;

    // trava scroll do body
    if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';
  }

  closeUniformeModal() {
    this.modalAberto = false;
    this.modalFotos = [];
    this.modalIndex = 0;
    this.modalDescricao = '';

    if (typeof document !== 'undefined') document.body.style.overflow = '';
  }

  modalPrev() {
    const total = this.modalFotos.length;
    if (total <= 1) return;
    this.modalIndex = (this.modalIndex - 1 + total) % total;
  }

  modalNext() {
    const total = this.modalFotos.length;
    if (total <= 1) return;
    this.modalIndex = (this.modalIndex + 1) % total;
  }

  // ✅ teclas no modal: ESC fecha, ← → alterna
  @HostListener('document:keydown', ['$event'])
  onKeydown(ev: KeyboardEvent) {
    if (!this.modalAberto) return;

    if (ev.key === 'Escape') this.closeUniformeModal();
    if (ev.key === 'ArrowLeft') this.modalPrev();
    if (ev.key === 'ArrowRight') this.modalNext();
  }

  formatBRL(valor: number): string {
    return (valor ?? 0).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
