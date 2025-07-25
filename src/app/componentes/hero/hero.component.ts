import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  imagens = [
    { src: '/assets/banner-tela-grande.png', title: 'Banner Grande', link: '' },
    { src: '/assets/colonia-de-ferias-tela-grande.png', title: 'Colônia de Férias', link: 'https://docs.google.com/forms/d/e/1FAIpQLScwX8qnPyt03wioC4b4ZimVc-HlrMnm9BqvGBWKUlQr-793Xw/viewform?usp=header' }
  ];

  imagensPequenas = [
    { src: '/assets/banner-tela-pequena.png', title: 'Banner Pequeno', link: '' },
    { src: '/assets/colonia-de-ferias-tela-pequena.png', title: 'Colônia Pequena', link: 'https://docs.google.com/forms/d/e/1FAIpQLScwX8qnPyt03wioC4b4ZimVc-HlrMnm9BqvGBWKUlQr-793Xw/viewform?usp=header' }
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
    this.indiceAtual = (this.indiceAtual + 1) % this.imagens.length;
  }

  anterior() {
    this.indiceAtual = (this.indiceAtual - 1 + this.imagens.length) % this.imagens.length;
  }

  irParaSlide(index: number) {
    this.indiceAtual = index;
  }
}
