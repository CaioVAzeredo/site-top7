import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { Equipe } from './equipe';

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css'] // <- corrigido aqui
})
export class EquipeComponent implements OnInit {
  equipe: Equipe[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getDadosEquipe().subscribe(res => {
      this.equipe = res;
    });
  }
}
