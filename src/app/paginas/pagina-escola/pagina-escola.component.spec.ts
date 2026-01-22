import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaEscolaComponent } from './pagina-escola.component';

describe('PaginaEscolaComponent', () => {
  let component: PaginaEscolaComponent;
  let fixture: ComponentFixture<PaginaEscolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaEscolaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaEscolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
