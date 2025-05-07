import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private jsonEquipe = 'assets/equipe.json';
  private jsonModalidade = 'assets/modalidades.json';


  constructor(private http: HttpClient) { }

  getDadosEquipe(): Observable<any> {
    return this.http.get<any>(this.jsonEquipe);
  }
  
  getDadosModalidade():Observable<any>{
    return this.http.get<any>(this.jsonModalidade);
  }
}
