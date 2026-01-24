import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Horario {
  horario: string;
  seg: string;
  ter: string;
  qua: string;
  qui: string;
  sex: string;
}

interface GradeItem {
  nivel: string;
  horarios: Horario[];
}

interface Unidade {
  id: number | string;
  imagem: string;
  titulo: string;
  numero: string;
  grade: GradeItem[];
}

interface Escola {
  id: string;
  nome: string;
  logo: string;
  unidades: Unidade[];
}

interface EscolasJson {
  escolas: Escola[];
}

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private eRef: ElementRef
  ) { }

  menuAberto = false;
  dropdownEscolasAberto = false;
  grupoAberto: string | null = null;

  escolas: Escola[] = [];

  ngOnInit(): void {
    this.carregarEscolas();
  }

  private carregarEscolas() {
    this.http.get<EscolasJson>('assets/novas-modalidades.json').subscribe({
      next: (data) => {
        this.escolas = data?.escolas ?? [];
      },
      error: (err) => {
        console.error('Erro ao carregar JSON de escolas:', err);
        this.escolas = [];
      }
    });
  }

  statusMenu() {
    this.menuAberto = !this.menuAberto;

    if (!this.menuAberto) {
      this.dropdownEscolasAberto = false;
      this.grupoAberto = null;
    }
  }

  fecharMenuMobile() {
    if (this.menuAberto) this.menuAberto = false;
    this.dropdownEscolasAberto = false;
    this.grupoAberto = null;
  }

  pagHome() {
    this.router.navigate(['/']);
  }

  toggleDropdownEscolas(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.dropdownEscolasAberto = !this.dropdownEscolasAberto;

    if (this.dropdownEscolasAberto) {
      this.grupoAberto = null;
    }
  }

  toggleGrupo(escolaId: string) {
    this.grupoAberto = this.grupoAberto === escolaId ? null : escolaId;
  }

  getTituloGrupo(escola: Escola): string {
    if (escola.id === 'ideal') return 'Ideal';
    if (escola.id === 'sigma') return 'Sigma';
    return escola.nome;
  }

  selecionarUnidade(escolaId: string, unidadeId: number | string) {
    this.dropdownEscolasAberto = false;
    this.menuAberto = false;
    this.grupoAberto = null;

    this.router.navigate(['/modalidade', escolaId, unidadeId]);
  }

  // ✅ fecha somente se clicar fora do componente
  @HostListener('document:click', ['$event'])
  onClickFora(event: MouseEvent) {
    const target = event.target as Node | null;
    if (!target) return;

    if (!this.eRef.nativeElement.contains(target)) {
      this.dropdownEscolasAberto = false;
      this.grupoAberto = null;
    }
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.dropdownEscolasAberto = false;
    this.grupoAberto = null;
  }
}
