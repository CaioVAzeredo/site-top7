import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
   imagensPequenas = [
    '/assets/banner-tela-pequena.png',
    '/assets/colonia-de-ferias-tela-pequena.png'
  ];

  imagens = [
    '/assets/banner-tela-grande.png',
    '/assets/colonia-de-ferias-tela-grande.png'
  ];

  indiceAtual = 0;
  intervalo: any;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.iniciarTrocaAutomatica();
    }
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
    if (this.imagens.length > 0) {
      this.indiceAtual = (this.indiceAtual + 1) % this.imagens.length;
    }
  }

  anterior() {
    if (this.imagens.length > 0) {
      this.indiceAtual = (this.indiceAtual - 1 + this.imagens.length) % this.imagens.length;
    }
  }
}
