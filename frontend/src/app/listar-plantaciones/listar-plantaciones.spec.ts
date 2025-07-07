import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPlantacionesComponent } from './listar-plantaciones';

describe('ListarPlantacionesComponent', () => {
  let component: ListarPlantacionesComponent;
  let fixture: ComponentFixture<ListarPlantacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarPlantacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPlantacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
