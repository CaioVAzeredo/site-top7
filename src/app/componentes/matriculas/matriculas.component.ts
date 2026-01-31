import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Escola } from '../../models/escolas.model';

type MatriculasInfo = {
  mensalidade: number;
  sigmaClub?: number;
  uniforme: number;
  patchJudo: number;
  camisaAvulso: number;
  shortAvulso: number;
  observacoes?: string[];
};

@Component({
  selector: 'app-matriculas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matriculas.component.html',
  styleUrl: './matriculas.component.css'
})
export class MatriculasComponent implements OnChanges {
  @Input() escolaId = '';

  escola: Escola | null = null;
  matriculas: MatriculasInfo | null = null;

  constructor(private apiService: ApiService) { }
  getTextoUniformes(): string {
    return this.escolaId === 'ideal'
      ? 'Compras apenas na secretaria'
      : 'Compras apenas na recepção';
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['escolaId']) {
      this.carregarDados();
    }
  }

  private carregarDados(): void {
    if (!this.escolaId) {
      this.escola = null;
      this.matriculas = null;
      return;
    }

    this.apiService.getEscolas().subscribe((escolas) => {
      this.escola = escolas.find(e => e.id === this.escolaId) ?? null;

      // ✅ o JSON novo está em escola.matriculas
      const anyEscola = this.escola as any;
      this.matriculas = (anyEscola?.matriculas ?? null) as MatriculasInfo | null;
    });
  }

  formatBRL(value?: number | null): string {
    if (value === null || value === undefined) return 'R$ --';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  getAvisoUniformesTreino(): string {
    const obs = this.matriculas?.observacoes?.[0];
    return obs ?? 'Os uniformes de treinamento do judô, taekwondo e ballet, são tratados e adquiridos diretamente com o professor.';
  }
}
