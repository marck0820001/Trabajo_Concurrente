import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPlantaciones } from './listar-plantaciones';

describe('ListarPlantaciones', () => {
  let component: ListarPlantaciones;
  let fixture: ComponentFixture<ListarPlantaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarPlantaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPlantaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
