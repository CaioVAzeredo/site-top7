import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-escolas',
  standalone: true,
  imports: [],
  templateUrl: './escolas.component.html',
  styleUrls: ['./escolas.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EscolasComponent { }
