import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UnidadeComponent } from "../unidade/unidade.component";

@Component({
  selector: 'app-modalidades',
  imports: [CommonModule, UnidadeComponent],
  templateUrl: './modalidades.component.html',
  styleUrl: './modalidades.component.css'
})
export class ModalidadesComponent implements OnInit {
  modalidades: any[] = [];

  constructor(private apiService: ApiService) { }

  fucaoUnidade() {
    alert("Fucão Unidade");
  }
  ngOnInit(): void {
    this.apiService.getDadosModalidade().subscribe(res => {
      this.modalidades = res;
    })
  }
}
