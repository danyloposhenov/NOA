import { Injectable } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoResolver implements Resolve<DocumentData> {

  constructor ( private productService: ProductService ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DocumentData> {
    return this.productService.getOneFirebase(route.paramMap.get('id') as string);
  }
}
