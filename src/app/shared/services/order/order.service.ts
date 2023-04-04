import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public changeBasket = new Subject <boolean>;

  public orderCollection!: CollectionReference<DocumentData>

  constructor(public afs: Firestore) {
    this.orderCollection = collection(this.afs, 'orders')
  }

  getAll() {
    return collectionData(this.orderCollection, { idField: 'id' });
  }


  create(order: any) {
    return addDoc(this.orderCollection, order);
  }

}
