import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UnidadeComponent } from '../unidade/unidade.component';
import { UnidadeDaEscola } from '../../models/escolas.model';

@Component({
  selector: 'app-modalidades',
  standalone: true,
  imports: [CommonModule, UnidadeComponent],
  templateUrl: './modalidades.component.html',
  styleUrl: './modalidades.component.css'
})
export class ModalidadesComponent implements OnChanges {
  @Input() escolaId: string | null = null;

  unidades: UnidadeDaEscola[] = [];

  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['escolaId']) {
      this.carregar();
    }
  }

  private carregar(): void {
    if (!this.escolaId) {
      this.unidades = [];
      return;
    }

    this.apiService.getUnidadesPorEscola(this.escolaId).subscribe(res => {
      this.unidades = res;
    });
  }

  trackByUnidadeId(_: number, item: UnidadeDaEscola) {
    return item.id;
  }
}
