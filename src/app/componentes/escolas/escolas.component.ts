import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ApiService } from '../../service/api.service';
import { Escola } from '../../models/escolas.model';

@Component({
  selector: 'app-escolas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './escolas.component.html',
  styleUrls: ['./escolas.component.css'],
})
export class EscolasComponent implements OnInit {
  escolas: Escola[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getEscolas().subscribe(res => {
      this.escolas = res;
    });
  }

  trackByEscolaId(_: number, item: Escola) {
    return item.id;
  }
}
