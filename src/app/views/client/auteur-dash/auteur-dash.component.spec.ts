import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuteurDashComponent } from './auteur-dash.component';

describe('AuteurDashComponent', () => {
  let component: AuteurDashComponent;
  let fixture: ComponentFixture<AuteurDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuteurDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuteurDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
