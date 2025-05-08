import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAuteurComponent } from './liste-auteur.component';

describe('ListeAuteurComponent', () => {
  let component: ListeAuteurComponent;
  let fixture: ComponentFixture<ListeAuteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeAuteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
