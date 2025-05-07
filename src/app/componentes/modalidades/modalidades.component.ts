import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-modalidades',
  imports: [CommonModule],
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
      console.log(this.modalidades);
    })
  }
}
