import { Component } from '@angular/core';

@Component({
  selector: 'app-rodape',
  imports: [],
  templateUrl: './rodape.component.html',
  styleUrl: './rodape.component.css'
})
export class RodapeComponent {
  btnInstagram(){
    window.open("https://www.instagram.com/top7esportes/", "_blank")
  }

  btnEmail(){
    window.open("mailto:caio.viana.39@gmail.com")
  }

  btnSiteCaio(){
    window.open("https://meu-portifolio-caio.vercel.app", "_blank")
  }
}