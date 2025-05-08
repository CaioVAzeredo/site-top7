import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipe } from '../componentes/equipe/equipe';
import { Unidade } from '../componentes/unidade/unidade';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private jsonEquipe = 'assets/equipe.json';
  private jsonModalidade = 'assets/modalidades.json';


  constructor(private http: HttpClient) { }

  getDadosEquipe(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(this.jsonEquipe);
  }

  getDadosModalidade(): Observable<Unidade[]> {
    return this.http.get<Unidade[]>(this.jsonModalidade);
  }
}
