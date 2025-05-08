import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaModalidadeComponent } from './pagina-modalidade.component';

describe('PaginaModalidadeComponent', () => {
  let component: PaginaModalidadeComponent;
  let fixture: ComponentFixture<PaginaModalidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaModalidadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaModalidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
