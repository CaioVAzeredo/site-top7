import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoniaDeFeriasComponent } from './colonia-de-ferias.component';

describe('ColoniaDeFeriasComponent', () => {
  let component: ColoniaDeFeriasComponent;
  let fixture: ComponentFixture<ColoniaDeFeriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColoniaDeFeriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColoniaDeFeriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
