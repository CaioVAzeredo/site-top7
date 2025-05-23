import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponentComponent } from '../button-component/button-component.component';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponentComponent
  ],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent implements OnInit {
  contatoForm!: FormGroup;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.contatoForm = new FormGroup({
      assunto: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mensagem: new FormControl('', Validators.required),
    });
  }

  salvarContato() {
    if (this.contatoForm.valid) {
      this.apiService.enviarDados(this.contatoForm.value).subscribe({
        next: (resposta) => {
          console.log('Dados enviados com sucesso!', resposta);
          this.contatoForm.reset();
        },
        error: (error) => {
          console.log('Erro ao enviar', error);
          alert('Erro ao enviar os dados. Tente novamente mais tarde.');
        }
      })
    } else {
      this.contatoForm.markAllAsTouched();
    }
  }
}