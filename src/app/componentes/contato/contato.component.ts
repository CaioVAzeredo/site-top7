import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponentComponent } from '../button-component/button-component.component';

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
      console.log(this.contatoForm.value);
      alert('Formulário enviado com sucesso!');
      this.contatoForm.reset();
    } else {
      this.contatoForm.markAllAsTouched();
    }
  }
}