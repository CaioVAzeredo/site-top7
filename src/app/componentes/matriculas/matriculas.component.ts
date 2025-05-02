import { Component } from '@angular/core';
import { ButtonComponentComponent } from "../button-component/button-component.component";

@Component({
  selector: 'app-matriculas',
  imports: [ButtonComponentComponent],
  templateUrl: './matriculas.component.html',
  styleUrl: './matriculas.component.css'
})
export class MatriculasComponent {
  acaoButao(){
    alert("Botão clicado!");
  }
}
