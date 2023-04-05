import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderInformerComponent } from './header-informer.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('HeaderInformerComponent', () => {
  let component: HeaderInformerComponent;
  let fixture: ComponentFixture<HeaderInformerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderInformerComponent ],
      imports: [
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderInformerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
