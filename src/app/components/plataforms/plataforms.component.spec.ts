import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlataformsComponent } from './plataforms.component';

describe('PlataformsComponent', () => {
  let component: PlataformsComponent;
  let fixture: ComponentFixture<PlataformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlataformsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlataformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
