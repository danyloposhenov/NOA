import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderInformerComponent } from './header-informer.component';

describe('HeaderInformerComponent', () => {
  let component: HeaderInformerComponent;
  let fixture: ComponentFixture<HeaderInformerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderInformerComponent ]
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
