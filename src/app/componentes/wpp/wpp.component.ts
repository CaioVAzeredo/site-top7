import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-wpp',
  imports: [],
  templateUrl: './wpp.component.html',
  styleUrl: './wpp.component.css'
})
export class WppComponent implements OnChanges {
  @Input() numero: string = '';
  link: string = '';


  ngOnChanges(): void {
    this.link = 'https://wa.me/' + this.numero;
  }

}
