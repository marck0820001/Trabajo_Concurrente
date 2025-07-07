import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPlantacionComponent } from './registrar-plantacion';

describe('RegistrarPlantacionComponent', () => {
  let component: RegistrarPlantacionComponent;
  let fixture: ComponentFixture<RegistrarPlantacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarPlantacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPlantacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
