import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  public isDelivery$ = new Subject<boolean>();

  constructor() { }
}
