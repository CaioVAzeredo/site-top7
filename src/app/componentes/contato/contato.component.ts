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

  // ✅ novas mensagens
  sucessoMsg: string | null = null;
  erroMsg: string | null = null;

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

  private limparMensagens() {
    this.sucessoMsg = null;
    this.erroMsg = null;
  }

  salvarContato() {
    // limpa mensagens anteriores ao tentar enviar
    this.limparMensagens();

    if (this.contatoForm.valid) {
      this.apiService.enviarDados(this.contatoForm.value).subscribe({
        next: (resposta) => {
          console.log('Dados enviados com sucesso!', resposta);

          this.sucessoMsg = 'Mensagem enviada com sucesso! ';
          this.contatoForm.reset();

          // opcional: some sozinho depois de 4s
          setTimeout(() => {
            this.sucessoMsg = null;
          }, 4000);
        },
        error: (error) => {
          console.log('Erro ao enviar', error);

          this.erroMsg = 'Erro ao enviar a mensagem. Tente novamente mais tarde. ';

          // opcional: some sozinho depois de 6s
          setTimeout(() => {
            this.erroMsg = null;
          }, 6000);
        }
      });
    } else {
      this.contatoForm.markAllAsTouched();
      this.erroMsg = 'Preencha corretamente os campos antes de enviar. ';

      setTimeout(() => {
        this.erroMsg = null;
      }, 4000);
    }
  }
}
