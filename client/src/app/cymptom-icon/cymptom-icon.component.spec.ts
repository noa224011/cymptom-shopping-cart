import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CymptomIconComponent } from './cymptom-icon.component';

describe('CymptomIconComponent', () => {
  let component: CymptomIconComponent;
  let fixture: ComponentFixture<CymptomIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CymptomIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CymptomIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
