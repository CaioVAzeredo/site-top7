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
    window.open("https://www.instagram.com/top7esportes/", "_blank")
  }
  btnTermosDeUso(){
    alert("termos de uso");
  }
  btnPoliticaDePrivacidade(){
    alert("politica de privacidade");
  }
}
