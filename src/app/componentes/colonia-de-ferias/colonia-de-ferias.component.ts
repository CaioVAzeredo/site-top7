import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ApiService } from '../../service/api.service';
import { Escola } from '../../models/escolas.model';

@Component({
  selector: 'app-colonia-de-ferias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './colonia-de-ferias.component.html',
  styleUrl: './colonia-de-ferias.component.css'
})

export class ColoniaDeFeriasComponent {
  escolas: Escola[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getEscolas().subscribe(res => {
      this.escolas = res;
    });
  }

  abrirLinkExterno(escola: Escola): void {
    if (escola.nome.toLowerCase().includes('sigma')) {
      window.open('https://docs.google.com/forms/d/1FgJZR7QXK1fbg17gABSQXd4vyXSC_SwVqPpEf4Ysp4Y/edit?ts=69fa7e2d', '_blank');
    }

    if (escola.nome.toLowerCase().includes('ideal')) {
      window.open('https://docs.google.com/forms/d/1E1t4m3u4XCtJMRw_GOnx2VQKkMBiIYFL97eabxcexhM/edit?usp=sharing_eil_se_dm&ts=69fa93b9', '_blank');
    }
  }

  trackByEscolaId(index: number, item: Escola): number {
    return Number(item.id);
  }
}