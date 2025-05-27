import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponentComponent } from "../button-component/button-component.component";

@Component({
  selector: 'app-modal-component',
  standalone: true,
  imports: [CommonModule, ButtonComponentComponent],
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})
export class ModalComponentComponent implements OnInit, OnDestroy {

  @Input() titulo: string = '';
  @Input() conteudo: string = '';
  @Output() fechar = new EventEmitter<void>();
  @Output() abriu = new EventEmitter<void>();
  @Output() fechou = new EventEmitter<void>();

  private scrollPosition = 0;

  fecharModal() {
    this.fechar.emit();
  }

  ngOnInit(): void {
    this.scrollPosition = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollPosition}px`;
    document.body.style.width = '100%';
    this.abriu.emit();
  }

  ngOnDestroy(): void {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, this.scrollPosition);
    this.fechou.emit();
  }
}

