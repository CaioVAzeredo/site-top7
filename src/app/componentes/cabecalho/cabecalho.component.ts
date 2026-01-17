import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

type EscolaMenu = { nome: string; rota?: string; ancora?: string };

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent {
  constructor(private router: Router) { }

  menuAberto = false;

  dropdownEscolasAberto = false;
  grupoAberto: 'Ideal' | 'Sigma' | null = null;


  private gruposEscolas: Record<'Ideal' | 'Sigma', EscolaMenu[]> = {
    Ideal: [
      { nome: 'Taguatinga - QNG 31' },
      { nome: 'Taguatinga - QNG 26' },
      { nome: 'Águas Claras Jequitibá' },
      { nome: 'Águas Claras Manacá' },
      { nome: 'Asa Sul' },
      { nome: 'Asa Norte' },
      { nome: 'Jardim Botânico' }
    ],
    Sigma: [
      { nome: 'Águas Claras' },
      { nome: 'Asa Sul' },
      { nome: 'Asa Norte' }
    ]
  };

  statusMenu() {
    this.menuAberto = !this.menuAberto;

    // se fechar o menu mobile, fecha o dropdown
    if (!this.menuAberto) {
      this.dropdownEscolasAberto = false;
    }
  }

  fecharMenuMobile() {
    if (this.menuAberto) this.menuAberto = false;
    this.dropdownEscolasAberto = false;
  }

  pagHome() {
    this.router.navigate(['/']);
  }

  toggleDropdownEscolas(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.dropdownEscolasAberto = !this.dropdownEscolasAberto;

    // ✅ quando abrir, começa com tudo fechado
    if (this.dropdownEscolasAberto) {
      this.grupoAberto = null;
    }
  }


  toggleGrupo(grupo: 'Ideal' | 'Sigma') {
    this.grupoAberto = this.grupoAberto === grupo ? null : grupo;
  }


  getEscolasDoGrupo(grupo: 'Ideal' | 'Sigma') {
    return this.gruposEscolas[grupo] ?? [];
  }

  selecionarEscola(escola: EscolaMenu) {
    this.dropdownEscolasAberto = false;
    this.menuAberto = false;

    if (escola.rota) {
      this.router.navigateByUrl(escola.rota);
      return;
    }

    if (escola.ancora) {
      const el = document.getElementById(escola.ancora);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    console.log('Escola selecionada:', escola.nome);
  }

  @HostListener('document:click')
  onClickFora() {
    this.dropdownEscolasAberto = false;
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.dropdownEscolasAberto = false;
  }
}
