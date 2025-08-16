import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Imagens } from './imagens';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  imagens: Imagens[] = [];
  imagensPequenas: Imagens[] = [];


  indiceAtual = 0;
  intervalo: any;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private apiService: ApiService ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.iniciarTrocaAutomatica();
    }
    this.apiService.getImagens().subscribe(res => {
      this.imagens = res;
    });
    this.apiService.getImagensPequenas().subscribe(res => {
      this.imagensPequenas = res;
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
    this.indiceAtual = (this.indiceAtual + 1) % this.imagens.length;
  }

  anterior() {
    this.indiceAtual = (this.indiceAtual - 1 + this.imagens.length) % this.imagens.length;
  }

  irParaSlide(index: number) {
    this.indiceAtual = index;
  }
}
