// hero.component.ts
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Imagens } from './imagens';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit, OnDestroy {
  imagens: Imagens[] = [];
  imagensPequenas: Imagens[] = [];

  indiceAtual = 0;
  intervalo: any;
  isBrowser: boolean;

  // ✅ loading/erro por slide (grande e pequeno)
  private slideLoaded: Record<number, boolean> = {};
  private slideError: Record<number, boolean> = {};

  private slideLoadedSmall: Record<number, boolean> = {};
  private slideErrorSmall: Record<number, boolean> = {};

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private apiService: ApiService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.iniciarTrocaAutomatica();
    }

    this.apiService.getImagens().subscribe((res) => {
      this.imagens = res ?? [];
      this.resetSlidesEstadosGrande();
      this.garantirIndiceValido();
    });

    this.apiService.getImagensPequenas().subscribe((res) => {
      this.imagensPequenas = res ?? [];
      this.resetSlidesEstadosPequeno();
      this.garantirIndiceValido();
    });
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      clearInterval(this.intervalo);
    }
  }

  iniciarTrocaAutomatica() {
    this.intervalo = setInterval(() => {
      this.proximo();
    }, 5000);
  }

  proximo() {
    const total = this.totalSlides();
    if (total <= 1) return;
    this.indiceAtual = (this.indiceAtual + 1) % total;
  }

  anterior() {
    const total = this.totalSlides();
    if (total <= 1) return;
    this.indiceAtual = (this.indiceAtual - 1 + total) % total;
  }

  irParaSlide(index: number) {
    const total = this.totalSlides();
    if (total <= 0) return;
    this.indiceAtual = Math.min(Math.max(index, 0), total - 1);
  }

  /* =========================
   * ✅ HELPERS
   * ========================= */
  private totalSlides(): number {
    // usa o maior (pra não estourar)
    return Math.max(this.imagens?.length ?? 0, this.imagensPequenas?.length ?? 0);
  }

  private garantirIndiceValido() {
    const total = this.totalSlides();
    if (total <= 0) {
      this.indiceAtual = 0;
      return;
    }
    if (this.indiceAtual > total - 1) this.indiceAtual = 0;
  }

  private resetSlidesEstadosGrande() {
    this.slideLoaded = {};
    this.slideError = {};
  }

  private resetSlidesEstadosPequeno() {
    this.slideLoadedSmall = {};
    this.slideErrorSmall = {};
  }

  /* =========================
   * ✅ GRANDE (desktop)
   * ========================= */
  isSlideLoaded(i: number): boolean {
    return this.slideLoaded[i] ?? false;
  }

  isSlideError(i: number): boolean {
    return this.slideError[i] ?? false;
  }

  onSlideLoad(i: number) {
    this.slideLoaded[i] = true;
    this.slideError[i] = false;
  }

  onSlideError(i: number) {
    this.slideError[i] = true;
    this.slideLoaded[i] = false;
  }

  /* =========================
   * ✅ PEQUENO (mobile)
   * ========================= */
  isSlideLoadedSmall(i: number): boolean {
    return this.slideLoadedSmall[i] ?? false;
  }

  isSlideErrorSmall(i: number): boolean {
    return this.slideErrorSmall[i] ?? false;
  }

  onSlideLoadSmall(i: number) {
    this.slideLoadedSmall[i] = true;
    this.slideErrorSmall[i] = false;
  }

  onSlideErrorSmall(i: number) {
    this.slideErrorSmall[i] = true;
    this.slideLoadedSmall[i] = false;
  }
}
