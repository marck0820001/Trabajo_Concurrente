import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPlantacion } from './registrar-plantacion';

describe('RegistrarPlantacion', () => {
  let component: RegistrarPlantacion;
  let fixture: ComponentFixture<RegistrarPlantacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarPlantacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPlantacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
