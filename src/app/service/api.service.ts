import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Equipe } from '../componentes/equipe/equipe';
import { Imagens } from '../componentes/hero/imagens';
import { Escola, EscolasResponse, UnidadeDaEscola } from '../models/escolas.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private jsonEquipe = 'assets/equipe.json';
  private jsonImagens = 'assets/imagens.json';
  private jsonImagensPequenas = 'assets/imagensPequenas.json';

  // ✅ JSON NOVO (aninhado)
  private jsonEscolas = 'assets/novas-modalidades.json';

  private url = 'http://apitop7.caioapi.lat/api/contato';

  constructor(private http: HttpClient) { }

  getDadosEquipe(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(this.jsonEquipe);
  }

  getImagens(): Observable<Imagens[]> {
    return this.http.get<Imagens[]>(this.jsonImagens);
  }

  getImagensPequenas(): Observable<Imagens[]> {
    return this.http.get<Imagens[]>(this.jsonImagensPequenas);
  }

  enviarDados(dados: any): Observable<any> {
    return this.http.post(this.url, dados);
  }

  // ✅ escolas do JSON novo
  getEscolas(): Observable<Escola[]> {
    return this.http.get<EscolasResponse>(this.jsonEscolas).pipe(
      map(res => res.escolas)
    );
  }

  // ✅ unidades por escola
  getUnidadesPorEscola(escolaId: string): Observable<UnidadeDaEscola[]> {
    return this.getEscolas().pipe(
      map(escolas => escolas.find(e => e.id === escolaId)?.unidades ?? [])
    );
  }

  // ✅ uma unidade (para página-modalidade)
  getUnidade(escolaId: string, unidadeId: string): Observable<UnidadeDaEscola | null> {
    return this.getUnidadesPorEscola(escolaId).pipe(
      map(unidades => unidades.find(u => String(u.id) === String(unidadeId)) ?? null)
    );
  }
}
