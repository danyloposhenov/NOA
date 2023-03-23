import { TestBed } from '@angular/core/testing';
import { DiscountInfoResolver } from './discount-info.resolver';
import { Firestore } from '@angular/fire/firestore';

describe('DiscountInfoResolver', () => {
  let resolver: DiscountInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Firestore, useValue: {} },
      ]
    });
    resolver = TestBed.inject(DiscountInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
