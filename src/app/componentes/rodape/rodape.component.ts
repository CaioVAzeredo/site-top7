import { Component } from '@angular/core';

@Component({
  selector: 'app-rodape',
  imports: [],
  templateUrl: './rodape.component.html',
  styleUrl: './rodape.component.css'
})
export class RodapeComponent {
  btnLogo(){
    alert("Botão logo");
  }
  btnInstagram(){
    alert("Botão instagram");
  }
  btnTermosDeUso(){
    alert("termos de uso");
  }
  btnPoliticaDePrivacidade(){
    alert("politica de privacidade");
  }
}
