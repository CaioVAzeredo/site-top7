import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ApiService } from '../../service/api.service';
import { NivelGrade } from '../../models/escolas.model';

import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from '../../componentes/rodape/rodape.component';
import { BotaoSubirComponent } from '../../componentes/botao-subir/botao-subir.component';
import { MatriculasComponent } from '../../componentes/matriculas/matriculas.component';

type Uniforme = {
  descricao: string;
  ['foto-frente']?: string;
  ['foto-costa']?: string;
};

type Aba = 'grade' | 'uniformes' | 'adesao';
type AnimDir = 'forward' | 'back';

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

  abaAtiva: Aba = 'grade';

  // ✅ LOADING POR COMPONENTE
  carregandoUnidade = true;

  // ✅ IMAGEM PRINCIPAL (hero)
  heroImgLoaded = false;
  heroImgError = false;

  // ✅ controla qual foto está aparecendo em cada card
  private fotoIndex: Record<number, number> = {};
  private erroTentativas: Record<number, number> = {};

  // ✅ estados de loading por card (pra não mostrar foto carregando)
  private uniformeImgLoaded: Record<number, boolean> = {};
  private uniformeImgError: Record<number, boolean> = {};

  // ✅ MODAL
  modalAberto = false;
  modalFotos: string[] = [];
  modalIndex = 0;
  modalDescricao = '';

  modalImgLoaded = false;
  modalImgError = false;

  /* =========================
   * ✅ SLIDE DAS ABAS (CSS PURO)
   * ========================= */
  animando = false;
  abaEntrando: Aba | null = null;
  animDir: AnimDir = 'forward';
  lockedHeight: string | null = null;
  private animFallbackTimer: any = null;

  @ViewChild('tabsViewport') tabsViewport?: ElementRef<HTMLElement>;

  @ViewChild('tplGrade', { static: true }) tplGrade!: TemplateRef<any>;
  @ViewChild('tplUniformes', { static: true }) tplUniformes!: TemplateRef<any>;
  @ViewChild('tplAdesao', { static: true }) tplAdesao!: TemplateRef<any>;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  trackByIndex(index: number) {
    return index;
  }

  private abaIndex(aba: Aba): number {
    if (aba === 'grade') return 0;
    if (aba === 'uniformes') return 1;
    return 2;
  }

  getTemplate(aba: Aba | null): TemplateRef<any> {
    if (aba === 'uniformes') return this.tplUniformes;
    if (aba === 'adesao') return this.tplAdesao;
    return this.tplGrade;
  }

  private lockCurrentHeight() {
    const el = this.tabsViewport?.nativeElement;
    if (!el) return;
    const h = el.getBoundingClientRect().height;
    if (h > 0) this.lockedHeight = `${h}px`;
  }

  onTabAnimationEnd(ev?: AnimationEvent) {
    // garante que só finalize no fim da animação do container de entrada
    if (ev && ev.animationName && !ev.animationName.startsWith('tab-')) return;

    if (!this.animando) return;

    if (this.animFallbackTimer) {
      clearTimeout(this.animFallbackTimer);
      this.animFallbackTimer = null;
    }

    // finaliza troca
    this.abaAtiva = this.abaEntrando ?? this.abaAtiva;
    this.abaEntrando = null;
    this.animando = false;
    this.lockedHeight = null;
  }

  getTextoUniformes(): string {
    return this.escolaId === 'ideal'
      ? 'Compras apenas na secretaria'
      : 'Compras apenas na recepção';
  }

  setAba(aba: Aba) {
    if (aba === this.abaAtiva) return;
    if (this.animando) return;

    // ✅ se sair de uniformes, fecha modal
    if (this.abaAtiva === 'uniformes' && aba !== 'uniformes') {
      this.closeUniformeModal();
    }

    // trava altura pra não “pular”
    this.lockCurrentHeight();

    const oldIndex = this.abaIndex(this.abaAtiva);
    const newIndex = this.abaIndex(aba);

    // ✅ direção "no sentido dos botões"
    // e conforme você pediu:
    // grade -> uniformes (vai pra direita) = slide esquerda -> direita (forward)
    this.animDir = newIndex > oldIndex ? 'forward' : 'back';

    this.animando = true;
    this.abaEntrando = aba;

    // fallback caso animationend não dispare (raro)
    this.animFallbackTimer = setTimeout(() => {
      this.onTabAnimationEnd();
    }, 350);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.escolaId = params.get('escolaId') ?? '';
      this.unidadeId = params.get('unidadeId') ?? '';

      this.carregandoUnidade = true;

      this.apiService.getUnidade(this.escolaId, this.unidadeId).subscribe((unidade) => {
        if (!unidade) {
          this.carregandoUnidade = false;
          return;
        }

        this.imagem = unidade.imagem;
        this.titulo = unidade.titulo;
        this.numero = unidade.numero;
        this.grade = unidade.grade;

        this.uniformes = (unidade as any).uniformes ?? [];

        // reset estados
        this.fotoIndex = {};
        this.erroTentativas = {};
        this.uniformeImgLoaded = {};
        this.uniformeImgError = {};

        // hero (imagem principal)
        this.heroImgLoaded = false;
        this.heroImgError = false;

        // fecha modal se trocar unidade
        this.closeUniformeModal();

        // ✅ começa em grade
        this.abaAtiva = 'grade';
        this.animando = false;
        this.abaEntrando = null;
        this.lockedHeight = null;

        this.carregandoUnidade = false;
      });

      if (typeof window !== 'undefined') window.scrollTo(0, 0);
    });
  }

  /* =========================
   * HERO IMG (principal)
   * ========================= */
  onHeroImgLoad() {
    this.heroImgLoaded = true;
    this.heroImgError = false;
  }

  onHeroImgError() {
    this.heroImgError = true;
    this.heroImgLoaded = false;
  }

  /* =========================
   * UNIFORMES
   * ========================= */

  getFotos(u: Uniforme): string[] {
    return [u['foto-frente'], u['foto-costa']].filter(Boolean) as string[];
  }

  getFotoAtual(u: Uniforme, i: number): string | null {
    const fotos = this.getFotos(u);
    if (fotos.length === 0) return null;
    const idx = this.fotoIndex[i] ?? 0;
    return fotos[idx % fotos.length];
  }

  isUniformeImgLoaded(i: number): boolean {
    return this.uniformeImgLoaded[i] ?? false;
  }

  isUniformeImgError(i: number): boolean {
    return this.uniformeImgError[i] ?? false;
  }

  changeFoto(i: number, total: number, delta: number) {
    if (total <= 1) return;

    const current = this.fotoIndex[i] ?? 0;
    this.fotoIndex[i] = (current + delta + total) % total;

    this.uniformeImgLoaded[i] = false;
    this.uniformeImgError[i] = false;
  }

  onUniformeImgError(i: number, total: number) {
    const tries = this.erroTentativas[i] ?? 0;

    if (total > 1 && tries < total - 1) {
      this.erroTentativas[i] = tries + 1;

      this.uniformeImgLoaded[i] = false;
      this.uniformeImgError[i] = false;

      this.changeFoto(i, total, 1);
      return;
    }

    this.uniformeImgError[i] = true;
    this.uniformeImgLoaded[i] = false;
    this.erroTentativas[i] = 0;
  }

  onUniformeImgLoad(i: number) {
    this.uniformeImgLoaded[i] = true;
    this.uniformeImgError[i] = false;
    this.erroTentativas[i] = 0;
  }

  /* =========================
   * MODAL (LIGHTBOX)
   * ========================= */
  openUniformeModal(u: Uniforme, cardIndex: number) {
    const fotos = this.getFotos(u);
    if (fotos.length === 0) return;

    this.modalFotos = fotos;

    const current = this.fotoIndex[cardIndex] ?? 0;
    this.modalIndex = Math.min(Math.max(current, 0), fotos.length - 1);
    this.modalDescricao = u.descricao;

    this.modalAberto = true;

    this.modalImgLoaded = false;
    this.modalImgError = false;

    if (typeof document !== 'undefined') document.body.style.overflow = 'hidden';
  }

  closeUniformeModal() {
    this.modalAberto = false;
    this.modalFotos = [];
    this.modalIndex = 0;
    this.modalDescricao = '';

    this.modalImgLoaded = false;
    this.modalImgError = false;

    if (typeof document !== 'undefined') document.body.style.overflow = '';
  }

  onModalImgLoad() {
    this.modalImgLoaded = true;
    this.modalImgError = false;
  }

  onModalImgError() {
    this.modalImgError = true;
    this.modalImgLoaded = false;
  }

  modalPrev() {
    const total = this.modalFotos.length;
    if (total <= 1) return;

    this.modalIndex = (this.modalIndex - 1 + total) % total;

    this.modalImgLoaded = false;
    this.modalImgError = false;
  }

  modalNext() {
    const total = this.modalFotos.length;
    if (total <= 1) return;

    this.modalIndex = (this.modalIndex + 1) % total;

    this.modalImgLoaded = false;
    this.modalImgError = false;
  }

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
