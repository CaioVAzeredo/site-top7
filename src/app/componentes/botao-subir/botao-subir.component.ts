import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-botao-subir',
  imports: [CommonModule],
  templateUrl: './botao-subir.component.html',
  styleUrl: './botao-subir.component.css'
})
export class BotaoSubirComponent {
  mostrarBotaoVoltar = true;
  @Input() modalAberto = false;
  private ultimaPosicaoScroll = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.modalAberto) {
      return
    };

    const scrollAtual = window.pageYOffset
    if (scrollAtual < this.ultimaPosicaoScroll && scrollAtual > 300) {
      this.mostrarBotaoVoltar = true;
    } else {
      this.mostrarBotaoVoltar = false;
    }

    this.ultimaPosicaoScroll = scrollAtual;
  }
  btnVoltar() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
